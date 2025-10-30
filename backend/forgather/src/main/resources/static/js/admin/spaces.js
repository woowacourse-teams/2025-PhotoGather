/**
 * Spaces Management Page Script
 * Space 목록 조회 및 페이지네이션 처리
 */

// 전역 상태
let currentPage = 1;
let currentPageSize = 15;
let totalPages = 1;
let totalCount = 0;

document.addEventListener('DOMContentLoaded', function() {
    // 인증 확인
    if (!Auth.requireAuth()) {
        return;
    }

    // DOM 요소 참조
    const spacesTableBody = document.getElementById('spacesTableBody');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const errorMessage = document.getElementById('errorMessage');
    const pageSizeSelect = document.getElementById('pageSize');
    const paginationContainer = document.getElementById('pagination');
    const currentPageSpan = document.getElementById('currentPage');
    const totalPagesSpan = document.getElementById('totalPages');
    const totalCountSpan = document.getElementById('totalCount');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    /**
     * 로딩 상태 표시
     */
    function showLoading() {
        loadingSpinner.style.display = 'flex';
        spacesTableBody.innerHTML = '';
        paginationContainer.style.display = 'none';
    }

    /**
     * 로딩 상태 해제
     */
    function hideLoading() {
        loadingSpinner.style.display = 'none';
    }

    /**
     * 에러 메시지 표시
     * @param {string} message - 에러 메시지
     */
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        spacesTableBody.innerHTML = '';
        paginationContainer.style.display = 'none';
    }

    /**
     * 에러 메시지 숨김
     */
    function hideError() {
        errorMessage.textContent = '';
        errorMessage.style.display = 'none';
    }

    /**
     * Toast 알림 표시
     * @param {string} message - 알림 메시지
     * @param {string} type - 알림 타입 (success, error, warning)
     */
    function showToast(message, type = 'info') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast ${type}`;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    /**
     * Space 테이블 렌더링
     * @param {Array} spaces - Space 목록
     */
    function renderSpacesTable(spaces) {
        if (!spaces || spaces.length === 0) {
            spacesTableBody.innerHTML = `
                <tr>
                    <td colspan="4" style="text-align: center; padding: 3rem; color: var(--text-secondary);">
                        <div class="empty-state">
                            <div class="empty-state-icon">📭</div>
                            <h3>No Spaces Found</h3>
                            <p>There are no spaces to display.</p>
                        </div>
                    </td>
                </tr>
            `;
            return;
        }

        const rows = spaces.map(space => {
            const publicBadge = space.isPublic
                ? '<span class="badge badge-success">Public</span>'
                : '<span class="badge badge-danger">Private</span>';

            return `
                <tr>
                    <td>${space.id}</td>
                    <td>${escapeHtml(space.code)}</td>
                    <td>${escapeHtml(space.name)}</td>
                    <td style="text-align: center;">${publicBadge}</td>
                </tr>
            `;
        }).join('');

        spacesTableBody.innerHTML = rows;
    }

    /**
     * 페이지네이션 UI 업데이트
     */
    function updatePagination() {
        currentPageSpan.textContent = currentPage;
        totalPagesSpan.textContent = totalPages;
        totalCountSpan.textContent = totalCount;

        // 이전 버튼 활성화/비활성화
        prevBtn.disabled = currentPage <= 1;

        // 다음 버튼 활성화/비활성화
        nextBtn.disabled = currentPage >= totalPages;

        // 페이지네이션 표시
        paginationContainer.style.display = 'flex';
    }

    /**
     * Space 목록 로드
     */
    async function loadSpaces() {
        hideError();
        showLoading();

        try {
            const response = await API.getSpaces(currentPage, currentPageSize);

            // 상태 업데이트
            currentPage = response.currentPage;
            currentPageSize = response.pageSize;
            totalPages = response.totalPages;
            totalCount = response.totalCount;

            // 테이블 렌더링
            renderSpacesTable(response.spaces);

            // 페이지네이션 업데이트
            updatePagination();

        } catch (error) {
            console.error('Failed to load spaces:', error);
            showError(error.message || 'Failed to load spaces. Please try again.');
        } finally {
            hideLoading();
        }
    }

    /**
     * 페이지 이동
     * @param {number} page - 이동할 페이지 번호
     */
    function goToPage(page) {
        if (page < 1 || page > totalPages) {
            return;
        }
        currentPage = page;
        loadSpaces();
    }

    /**
     * 이전 페이지로 이동
     */
    window.goToPreviousPage = function() {
        goToPage(currentPage - 1);
    };

    /**
     * 다음 페이지로 이동
     */
    window.goToNextPage = function() {
        goToPage(currentPage + 1);
    };

    /**
     * HTML 이스케이프 (XSS 방지)
     * @param {string} text - 이스케이프할 텍스트
     * @returns {string} 이스케이프된 텍스트
     */
    function escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.toString().replace(/[&<>"']/g, m => map[m]);
    }

    /**
     * 페이지 크기 변경 핸들러
     */
    function handlePageSizeChange() {
        currentPageSize = parseInt(pageSizeSelect.value);
        currentPage = 1; // 첫 페이지로 리셋
        loadSpaces();
    }

    /**
     * 로그아웃 핸들러
     */
    function handleLogout() {
        if (confirm('Are you sure you want to logout?')) {
            Auth.logout();
        }
    }

    // 이벤트 리스너 등록
    pageSizeSelect.addEventListener('change', handlePageSizeChange);
    logoutBtn.addEventListener('click', handleLogout);

    // 키보드 네비게이션
    document.addEventListener('keydown', function(event) {
        // 좌측 화살표: 이전 페이지
        if (event.key === 'ArrowLeft' && currentPage > 1) {
            event.preventDefault();
            goToPreviousPage();
        }
        // 우측 화살표: 다음 페이지
        else if (event.key === 'ArrowRight' && currentPage < totalPages) {
            event.preventDefault();
            goToNextPage();
        }
    });

    // 초기 로드
    loadSpaces();
});
