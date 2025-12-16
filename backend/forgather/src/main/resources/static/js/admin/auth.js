/**
 * Authentication Utility Module
 * JWT 토큰 관리 및 인증 상태 확인
 */

const Auth = {
    /**
     * LocalStorage 키
     */
    STORAGE_KEY: {
        ACCESS_TOKEN: 'admin_access_token',
        REFRESH_TOKEN: 'admin_refresh_token'
    },

    /**
     * 액세스 토큰 저장
     * @param {string} token - JWT 액세스 토큰
     */
    setAccessToken(token) {
        if (token) {
            localStorage.setItem(this.STORAGE_KEY.ACCESS_TOKEN, token);
        }
    },

    /**
     * 리프레시 토큰 저장
     * @param {string} token - JWT 리프레시 토큰
     */
    setRefreshToken(token) {
        if (token) {
            localStorage.setItem(this.STORAGE_KEY.REFRESH_TOKEN, token);
        }
    },

    /**
     * 액세스 토큰 조회
     * @returns {string|null} JWT 액세스 토큰
     */
    getAccessToken() {
        return localStorage.getItem(this.STORAGE_KEY.ACCESS_TOKEN);
    },

    /**
     * 리프레시 토큰 조회
     * @returns {string|null} JWT 리프레시 토큰
     */
    getRefreshToken() {
        return localStorage.getItem(this.STORAGE_KEY.REFRESH_TOKEN);
    },

    /**
     * 모든 토큰 삭제 (로그아웃)
     */
    clearTokens() {
        localStorage.removeItem(this.STORAGE_KEY.ACCESS_TOKEN);
        localStorage.removeItem(this.STORAGE_KEY.REFRESH_TOKEN);
    },

    /**
     * 인증 여부 확인
     * @returns {boolean} 액세스 토큰 존재 여부
     */
    isAuthenticated() {
        return !!this.getAccessToken();
    },

    /**
     * JWT 토큰 디코딩 (payload 추출)
     * @param {string} token - JWT 토큰
     * @returns {object|null} 디코딩된 페이로드
     */
    decodeToken(token) {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join('')
            );
            return JSON.parse(jsonPayload);
        } catch (e) {
            console.error('Token decode error:', e);
            return null;
        }
    },

    /**
     * 토큰 만료 여부 확인
     * @param {string} token - JWT 토큰
     * @returns {boolean} 만료 여부
     */
    isTokenExpired(token) {
        if (!token) return true;

        const payload = this.decodeToken(token);
        if (!payload || !payload.exp) return true;

        const currentTime = Math.floor(Date.now() / 1000);
        return payload.exp < currentTime;
    },

    /**
     * 현재 액세스 토큰 만료 여부 확인
     * @returns {boolean} 만료 여부
     */
    isAccessTokenExpired() {
        const token = this.getAccessToken();
        return this.isTokenExpired(token);
    },

    /**
     * 로그인 페이지로 리다이렉트
     */
    redirectToLogin() {
        window.location.href = '/view/admin/login';
    },

    /**
     * 인증 확인 및 리다이렉트
     * 인증되지 않은 경우 로그인 페이지로 이동
     */
    requireAuth() {
        if (!this.isAuthenticated() || this.isAccessTokenExpired()) {
            this.clearTokens();
            this.redirectToLogin();
            return false;
        }
        return true;
    },

    /**
     * 로그아웃 처리
     */
    logout() {
        this.clearTokens();
        this.redirectToLogin();
    },

    /**
     * Refresh Token을 사용해 새로운 Access Token 발급
     *
     * @returns {Promise<string>} 새로 발급된 Access Token
     * @throws {Error} Refresh Token이 없거나 만료된 경우
     *
     * 동작 과정:
     * 1. localStorage에서 Refresh Token 조회
     * 2. POST /admin/refresh API 호출
     * 3. 응답으로 받은 새 Access Token과 Refresh Token을 localStorage에 저장
     * 4. 새 Access Token 반환
     *
     * 에러 처리:
     * - Refresh Token이 없으면: clearTokens() 후 로그인 페이지 이동
     * - API 호출 실패 (401/404): clearTokens() 후 로그인 페이지 이동
     * - 네트워크 에러: 에러 던지기 (상위에서 처리)
     *
     * 주의사항 (무한 루프 방지):
     * - 이 함수는 api.js의 401 인터셉터에서만 호출되어야 함
     * - 직접 fetch를 사용하므로 API.request()를 사용하면 무한 루프 발생
     * - Refresh Token API가 401을 반환하면 더 이상 재시도하지 않고 로그인 페이지로 이동
     *
     * 보안:
     * - console.log에 실제 토큰 값을 출력하지 않음 (보안 위험)
     * - 로그인 페이지로 리다이렉트 시 토큰을 완전히 삭제
     */
    async refreshToken() {
        const refreshToken = this.getRefreshToken();

        if (!refreshToken) {
            console.warn('[Auth] Refresh Token이 없습니다. 로그인 페이지로 이동합니다.');
            this.clearTokens();
            this.redirectToLogin();
            throw new Error('No refresh token available');
        }

        try {
            // 주의: 여기서는 API.request()를 사용하면 안 됨 (무한 루프)
            // 직접 fetch를 사용하여 Refresh Token API 호출
            const response = await fetch('/admin/refresh', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({refreshToken})
            });

            // 401/404: Refresh Token 만료 또는 유효하지 않음
            // 더 이상 갱신할 수 없으므로 로그인 페이지로 리다이렉트
            if (response.status === 401 || response.status === 404) {
                console.warn('[Auth] Refresh Token이 만료되었습니다. 재로그인이 필요합니다.');
                this.clearTokens();
                this.redirectToLogin();
                throw new Error('Refresh token expired');
            }

            // 기타 HTTP 에러 (500 등)
            if (!response.ok) {
                throw new Error(`Token refresh failed: ${response.status}`);
            }

            const data = await response.json();

            // 새 Access Token과 Refresh Token 저장
            // 서버가 새로운 Refresh Token도 함께 발급하는 경우를 대비
            this.setAccessToken(data.accessToken);
            if (data.refreshToken) {
                this.setRefreshToken(data.refreshToken);
            }

            return data.accessToken;

        } catch (error) {
            console.error('[Auth] Token refresh error:', error.message);
            throw error;
        }
    }
};

// 전역 객체로 노출
window.Auth = Auth;
