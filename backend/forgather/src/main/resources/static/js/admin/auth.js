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
        window.location.href = '/admin/login';
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
    }
};

// 전역 객체로 노출
window.Auth = Auth;
