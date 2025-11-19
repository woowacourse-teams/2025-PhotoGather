/**
 * Login Page Script
 * 로그인 폼 처리 및 인증 로직
 */

document.addEventListener('DOMContentLoaded', function() {
    // 이미 로그인된 경우 spaces 페이지로 리다이렉트
    if (Auth.isAuthenticated() && !Auth.isAccessTokenExpired()) {
        window.location.href = '/view/admin/spaces';
        return;
    }

    // DOM 요소 참조
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.getElementById('loginBtn');
    const errorMessage = document.getElementById('errorMessage');
    const loadingSpinner = document.getElementById('loadingSpinner');

    /**
     * 에러 메시지 표시
     * @param {string} message - 에러 메시지
     */
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }

    /**
     * 에러 메시지 숨김
     */
    function hideError() {
        errorMessage.textContent = '';
        errorMessage.style.display = 'none';
    }

    /**
     * 로딩 상태 표시
     */
    function showLoading() {
        loadingSpinner.style.display = 'flex';
        loginBtn.disabled = true;
        usernameInput.disabled = true;
        passwordInput.disabled = true;
    }

    /**
     * 로딩 상태 해제
     */
    function hideLoading() {
        loadingSpinner.style.display = 'none';
        loginBtn.disabled = false;
        usernameInput.disabled = false;
        passwordInput.disabled = false;
    }

    /**
     * 입력 값 검증
     * @returns {boolean} 검증 통과 여부
     */
    function validateInputs() {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (!username) {
            showError('Username is required.');
            usernameInput.focus();
            return false;
        }

        if (!password) {
            showError('Password is required.');
            passwordInput.focus();
            return false;
        }

        if (username.length < 3) {
            showError('Username must be at least 3 characters long.');
            usernameInput.focus();
            return false;
        }

        if (password.length < 4) {
            showError('Password must be at least 4 characters long.');
            passwordInput.focus();
            return false;
        }

        return true;
    }

    /**
     * 로그인 처리
     * @param {Event} event - Submit 이벤트
     */
    async function handleLogin(event) {
        event.preventDefault();
        hideError();

        // 입력 값 검증
        if (!validateInputs()) {
            return;
        }

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        try {
            showLoading();

            // 로그인 API 호출
            const response = await API.login(username, password);

            // 토큰 저장
            Auth.setAccessToken(response.accessToken);
            Auth.setRefreshToken(response.refreshToken);

            console.log('Login successful');

            // Spaces 페이지로 리다이렉트
            window.location.href = '/view/admin/spaces';

        } catch (error) {
            console.error('Login failed:', error);
            showError(error.message || 'Login failed. Please check your credentials and try again.');
            passwordInput.value = '';
            passwordInput.focus();
        } finally {
            hideLoading();
        }
    }

    // 폼 제출 이벤트 리스너
    loginForm.addEventListener('submit', handleLogin);

    // 입력 필드에서 에러 메시지 제거
    usernameInput.addEventListener('input', hideError);
    passwordInput.addEventListener('input', hideError);

    // Enter 키 처리
    [usernameInput, passwordInput].forEach(input => {
        input.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                loginForm.dispatchEvent(new Event('submit'));
            }
        });
    });

    // 포커스 설정
    usernameInput.focus();
});
