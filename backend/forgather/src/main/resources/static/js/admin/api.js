/**
 * API Utility Module
 * Fetch API를 사용한 HTTP 요청 유틸리티
 */

const API = {
    /**
     * API 기본 URL
     */
    BASE_URL: '/api/admin',

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
     * Fetch 요청 래퍼
     * @param {string} url - 요청 URL
     * @param {object} options - Fetch 옵션
     * @returns {Promise<object>} 응답 데이터
     */
    async request(url, options = {}) {
        try {
            const response = await fetch(url, options);

            // 401 Unauthorized - 인증 실패
            if (response.status === 401) {
                console.error('Unauthorized: Token expired or invalid');
                Auth.clearTokens();
                Auth.redirectToLogin();
                throw new Error('인증이 필요합니다. 다시 로그인해주세요.');
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
            console.error('API Request Error:', error);
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
    }
};

// 전역 객체로 노출
window.API = API;
