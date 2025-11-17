/**
 * API Utility Module
 * Fetch API를 사용한 HTTP 요청 유틸리티
 * 401 에러 발생 시 자동으로 Refresh Token을 사용해 Access Token을 갱신하고 재시도
 */

/**
 * Token Refresh Promise 캐시
 *
 * 목적: 동시에 여러 API 요청이 401 에러를 받을 때 Refresh Token 요청이 중복되는 것을 방지
 *
 * 동시 다중 401 시나리오:
 * - 사용자가 페이지를 열었을 때 여러 API 요청이 동시에 발생 (예: 스페이스 목록, 사용자 정보, 통계 등)
 * - Access Token이 만료되어 모든 요청이 동시에 401 에러를 받음
 * - 각 요청마다 Auth.refreshToken()을 호출하면 동일한 Refresh Token으로 여러 번 갱신 요청
 * - 서버에 불필요한 부하 + 경합 조건(race condition) 발생 가능
 *
 * 해결 방법:
 * - 첫 번째 401 에러가 Auth.refreshToken()을 호출하면 그 Promise를 캐싱
 * - 이후 401 에러들은 새로 Auth.refreshToken()을 호출하지 않고 캐시된 Promise를 재사용
 * - Token 갱신이 완료되면 캐시를 null로 리셋
 * - 모든 대기 중인 요청들이 동일한 새 Access Token을 받아 재시도
 *
 * @type {Promise<string>|null}
 */
let tokenRefreshPromise = null;

const API = {
    /**
     * API 기본 URL
     */
    BASE_URL: '/admin',

    /**
     * HTTP 메서드
     */
    METHOD: {
        GET: 'GET',
        POST: 'POST',
        PUT: 'PUT',
        DELETE: 'DELETE',
        PATCH: 'PATCH'
    },

    /**
     * 기본 헤더 생성
     * @param {boolean} includeAuth - Authorization 헤더 포함 여부
     * @returns {object} 헤더 객체
     */
    getHeaders(includeAuth = true) {
        const headers = {
            'Content-Type': 'application/json'
        };

        if (includeAuth && Auth.isAuthenticated()) {
            const token = Auth.getAccessToken();
            headers['Authorization'] = `Bearer ${token}`;
        }

        return headers;
    },

    /**
     * Fetch 요청 래퍼 (401 에러 자동 처리 포함)
     *
     * @param {string} url - 요청 URL
     * @param {object} options - Fetch 옵션
     * @param {boolean} isRetry - 재시도 여부 (내부 플래그, 외부에서 사용 금지)
     * @returns {Promise<object>} 응답 데이터
     *
     * 자동 처리 기능:
     * 1. Access Token을 Authorization 헤더에 자동 추가 (includeAuth 옵션에 따라)
     * 2. 401 에러 시 Refresh Token으로 토큰 갱신
     * 3. 갱신 성공 시 원래 요청 자동 재시도 (새 Access Token 사용)
     * 4. 갱신 실패 시 로그인 페이지로 리다이렉트
     *
     * 무한 루프 방지:
     * - isRetry 플래그를 사용해 재시도는 최대 1회만 허용
     * - 재시도한 요청이 다시 401을 받으면 더 이상 재시도하지 않고 로그인 페이지로 이동
     * - Auth.refreshToken()은 직접 fetch를 사용하므로 이 함수를 거치지 않음 (무한 루프 방지)
     *
     * 동시성 제어:
     * - 여러 요청이 동시에 401을 받아도 Refresh Token 요청은 한 번만 발생
     * - tokenRefreshPromise 캐싱으로 동일한 갱신 Promise를 공유
     *
     * @throws {Error} 네트워크 에러, 인증 실패, 권한 없음, 리소스 없음, 서버 에러 등
     */
    async request(url, options = {}, isRetry = false) {
        try {
            const response = await fetch(url, options);

            // 401 Unauthorized - Access Token 만료 또는 유효하지 않음
            if (response.status === 401) {
                console.warn('[API] 401 Unauthorized 감지:', url);

                // 재시도 중에 다시 401이 발생하면 더 이상 재시도하지 않음
                // 이는 Refresh Token도 만료되었거나 유효하지 않음을 의미
                if (isRetry) {
                    console.error('[API] 재시도 후에도 401 에러 발생. 로그인이 필요합니다.');
                    Auth.clearTokens();
                    Auth.redirectToLogin();
                    throw new Error('인증이 필요합니다. 다시 로그인해주세요.');
                }

                // Token Refresh 시도
                try {
                    console.log('[API] Access Token 갱신 시도...');

                    // 동시 다중 401 에러 처리: tokenRefreshPromise 캐싱
                    // 이미 갱신 중이면 기존 Promise 재사용, 아니면 새로 시작
                    if (!tokenRefreshPromise) {
                        tokenRefreshPromise = Auth.refreshToken();
                    }

                    // Token 갱신 대기 (여러 요청이 동시에 여기서 대기할 수 있음)
                    const newAccessToken = await tokenRefreshPromise;

                    // 갱신 완료 후 캐시 리셋 (다음 401 에러를 위해)
                    tokenRefreshPromise = null;

                    console.log('[API] Access Token 갱신 완료. 원래 요청 재시도:', url);

                    // 새 Access Token으로 Authorization 헤더 업데이트
                    if (options.headers && options.headers['Authorization']) {
                        options.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    }

                    // 원래 요청 재시도 (isRetry=true로 무한 루프 방지)
                    return await this.request(url, options, true);

                } catch (refreshError) {
                    // Token 갱신 실패 (Refresh Token 만료, 네트워크 에러 등)
                    console.error('[API] Token 갱신 실패:', refreshError.message);
                    tokenRefreshPromise = null; // 캐시 리셋
                    // Auth.refreshToken()에서 이미 로그인 페이지로 리다이렉트했을 수 있음
                    throw new Error('세션이 만료되었습니다. 다시 로그인해주세요.');
                }
            }

            // 403 Forbidden - 권한 없음
            if (response.status === 403) {
                throw new Error('접근 권한이 없습니다.');
            }

            // 404 Not Found
            if (response.status === 404) {
                throw new Error('요청한 리소스를 찾을 수 없습니다.');
            }

            // 500 Internal Server Error
            if (response.status >= 500) {
                throw new Error('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
            }

            // 에러 응답 처리
            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                const message = errorData?.message || `요청 실패 (${response.status})`;
                throw new Error(message);
            }

            // 204 No Content
            if (response.status === 204) {
                return null;
            }

            return await response.json();
        } catch (error) {
            // fetch 자체 에러 (네트워크 에러 등) 또는 위에서 던진 에러
            console.error('[API] Request Error:', error.message);
            throw error;
        }
    },

    /**
     * GET 요청
     * @param {string} endpoint - API 엔드포인트
     * @param {object} params - 쿼리 파라미터
     * @param {boolean} includeAuth - Authorization 헤더 포함 여부
     * @returns {Promise<object>} 응답 데이터
     */
    async get(endpoint, params = {}, includeAuth = true) {
        const url = new URL(this.BASE_URL + endpoint, window.location.origin);

        // 쿼리 파라미터 추가
        Object.keys(params).forEach(key => {
            if (params[key] !== null && params[key] !== undefined) {
                url.searchParams.append(key, params[key]);
            }
        });

        return this.request(url.toString(), {
            method: this.METHOD.GET,
            headers: this.getHeaders(includeAuth)
        });
    },

    /**
     * POST 요청
     * @param {string} endpoint - API 엔드포인트
     * @param {object} data - 요청 본문 데이터
     * @param {boolean} includeAuth - Authorization 헤더 포함 여부
     * @returns {Promise<object>} 응답 데이터
     */
    async post(endpoint, data = {}, includeAuth = true) {
        const url = this.BASE_URL + endpoint;

        return this.request(url, {
            method: this.METHOD.POST,
            headers: this.getHeaders(includeAuth),
            body: JSON.stringify(data)
        });
    },

    /**
     * PUT 요청
     * @param {string} endpoint - API 엔드포인트
     * @param {object} data - 요청 본문 데이터
     * @param {boolean} includeAuth - Authorization 헤더 포함 여부
     * @returns {Promise<object>} 응답 데이터
     */
    async put(endpoint, data = {}, includeAuth = true) {
        const url = this.BASE_URL + endpoint;

        return this.request(url, {
            method: this.METHOD.PUT,
            headers: this.getHeaders(includeAuth),
            body: JSON.stringify(data)
        });
    },

    /**
     * DELETE 요청
     * @param {string} endpoint - API 엔드포인트
     * @param {boolean} includeAuth - Authorization 헤더 포함 여부
     * @returns {Promise<object>} 응답 데이터
     */
    async delete(endpoint, includeAuth = true) {
        const url = this.BASE_URL + endpoint;

        return this.request(url, {
            method: this.METHOD.DELETE,
            headers: this.getHeaders(includeAuth)
        });
    },

    /**
     * 로그인 API
     * @param {string} username - 사용자명
     * @param {string} password - 비밀번호
     * @returns {Promise<object>} 로그인 응답 (accessToken, refreshToken)
     */
    async login(username, password) {
        return this.post('/login', { username, password }, false);
    },

    /**
     * Space 목록 조회 API
     * @param {number} page - 페이지 번호 (1부터 시작)
     * @param {number} size - 페이지 크기
     * @returns {Promise<object>} Space 목록 응답
     */
    async getSpaces(page = 1, size = 15) {
        return this.get('/spaces', { page, size }, true);
    },

    /**
     * Space 상세 정보 조회 API
     *
     * @param {string} spaceCode - 조회할 스페이스 코드 (예: "e3f6b97f19")
     * @returns {Promise<object>} 스페이스 상세 정보 응답
     * @returns {object} response.space - 스페이스 기본 정보 (id, code, name, isPublic)
     * @returns {boolean} response.hasProduct - 작품 소개 등록 여부
     * @returns {number} response.guestBookCount - 방명록 개수
     * @throws {Error} API 호출 실패 시 에러 (404: 존재하지 않는 스페이스, 401: 인증 실패 등)
     *
     * 사용 예시:
     * ```javascript
     * try {
     *     const detail = await API.getSpaceDetail('e3f6b97f19');
     *     console.log(detail.space.name); // "졸업 전시"
     *     console.log(detail.guestBookCount); // 42
     * } catch (error) {
     *     console.error('Failed to load space detail:', error);
     * }
     * ```
     *
     * 주의:
     * - 이 함수는 비동기(async)이므로 반드시 await 또는 .then() 사용 필요
     * - Authorization 헤더가 자동으로 포함되므로 로그인 상태여야 함
     * - spaceCode는 URL 경로에 포함되므로 특수문자가 있는 경우 인코딩 필요 없음
     */
    async getSpaceDetail(spaceCode) {
        return this.get(`/spaces/${spaceCode}`, {}, true);
    },

    /**
     * Host 목록 조회 API
     *
     * @param {number} page - 페이지 번호 (1부터 시작)
     * @param {number} size - 페이지 크기 (기본값: 15)
     * @returns {Promise<object>} Host 목록 응답
     * @returns {Array} response.hosts - Host 목록 배열
     * @returns {number} response.currentPage - 현재 페이지 번호 (1부터 시작)
     * @returns {number} response.pageSize - 페이지 크기
     * @returns {number} response.totalCount - 전체 Host 개수
     * @returns {number} response.totalPages - 전체 페이지 수
     * @throws {Error} API 호출 실패 시 에러 (401: 인증 실패, 500: 서버 에러 등)
     *
     * Host 객체 구조:
     * - id: Host ID (숫자)
     * - name: Host 이름 (문자열)
     * - createdAt: 생성 일시 (ISO 8601 문자열)
     * - spaceIds: 소유한 Space ID 배열 (숫자 배열)
     *
     * 사용 예시:
     * ```javascript
     * try {
     *     const response = await API.getHosts(1, 15);
     *     console.log(response.hosts); // [{ id: 1, name: "홍길동", ... }, ...]
     *     console.log(response.totalCount); // 100
     * } catch (error) {
     *     console.error('Failed to load hosts:', error);
     * }
     * ```
     *
     * 주의:
     * - 이 함수는 비동기(async)이므로 반드시 await 또는 .then() 사용 필요
     * - Authorization 헤더가 자동으로 포함되므로 로그인 상태여야 함
     * - 페이지 번호는 1부터 시작 (서버에서 0-based를 1-based로 변환하여 반환)
     */
    async getHosts(page = 1, size = 15) {
        return this.get('/hosts', { page, size }, true);
    }
};

// 전역 객체로 노출
window.API = API;
