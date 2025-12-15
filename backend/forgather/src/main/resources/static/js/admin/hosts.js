/**
 * Hosts Management Page Script
 * Host 목록 조회 및 페이지네이션 처리
 *
 * 주요 기능:
 * 1. 호스트 목록 API 호출 및 테이블 렌더링
 * 2. 페이지네이션 (이전/다음 버튼, 페이지 정보 표시)
 * 3. 페이지 크기 변경 (15/30/50개)
 * 4. 날짜 포맷팅 (ISO 8601 -> YYYY-MM-DD HH:mm)
 * 5. 로딩/에러 상태 관리
 */

// ==========================================================================
// 전역 상태 관리
// ==========================================================================

/**
 * 현재 페이지 번호 (1부터 시작)
 * - API 응답의 currentPage 값과 동기화
 */
let currentPage = 1;

/**
 * 현재 페이지 크기 (한 페이지에 표시할 아이템 개수)
 * - 사용자가 select box에서 변경 가능
 * - 기본값: 15
 */
let currentPageSize = 15;

/**
 * 전체 페이지 수
 * - API 응답의 totalPages 값으로 업데이트
 * - 다음 버튼 활성화/비활성화에 사용
 */
let totalPages = 1;

/**
 * 전체 아이템 개수
 * - API 응답의 totalCount 값으로 업데이트
 * - 사용자에게 전체 데이터 규모를 알림
 */
let totalCount = 0;

// ==========================================================================
// 페이지 초기화
// ==========================================================================

document.addEventListener('DOMContentLoaded', function() {
    // ======================================================================
    // 인증 확인
    // ======================================================================

    /**
     * 페이지 로드 시 사용자 인증 상태를 확인합니다.
     * - Access Token이 없거나 만료된 경우 로그인 페이지로 리다이렉트
     * - auth.js의 Auth.requireAuth() 함수 사용
     */
    if (!Auth.requireAuth()) {
        return;
    }

    // ======================================================================
    // DOM 요소 참조
    // ======================================================================

    /**
     * DOM 요소들을 변수에 저장하여 재사용합니다.
     * - getElementById는 매번 호출하면 성능 저하
     * - 한 번만 조회하여 변수에 캐싱
     */
    const hostsTableBody = document.getElementById('hostsTableBody');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const errorMessage = document.getElementById('errorMessage');
    const pageSizeSelect = document.getElementById('pageSize');
    const paginationContainer = document.getElementById('pagination');
    const logoutBtn = document.getElementById('logoutBtn');

    // ======================================================================
    // UI 상태 관리 함수
    // ======================================================================

    /**
     * 로딩 상태 표시
     * - 로딩 스피너를 표시합니다.
     * - 테이블과 페이지네이션을 숨깁니다.
     * - API 호출 시작 시 호출됩니다.
     */
    function showLoading() {
        loadingSpinner.style.display = 'flex';
        hostsTableBody.innerHTML = '';
        paginationContainer.style.display = 'none';
    }

    /**
     * 로딩 상태 해제
     * - 로딩 스피너를 숨깁니다.
     * - API 호출 완료 시 호출됩니다.
     */
    function hideLoading() {
        loadingSpinner.style.display = 'none';
    }

    /**
     * 에러 메시지 표시
     * @param {string} message - 표시할 에러 메시지
     *
     * - 사용자 친화적인 에러 메시지를 표시합니다.
     * - 테이블과 페이지네이션을 숨깁니다.
     * - 네트워크 에러, API 에러 등을 사용자에게 알립니다.
     */
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        hostsTableBody.innerHTML = '';
        paginationContainer.style.display = 'none';
    }

    /**
     * 에러 메시지 숨김
     * - 새로운 데이터 로드 시 이전 에러 메시지를 제거합니다.
     */
    function hideError() {
        errorMessage.textContent = '';
        errorMessage.style.display = 'none';
    }

    /**
     * Toast 알림 표시
     * @param {string} message - 알림 메시지
     * @param {string} type - 알림 타입 (success, error, warning, info)
     *
     * - 화면 우측 상단에 짧은 알림을 표시합니다.
     * - 3초 후 자동으로 사라집니다.
     * - 로그아웃 성공, 에러 발생 등의 피드백에 사용됩니다.
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

    // ======================================================================
    // 날짜 포맷팅 함수
    // ======================================================================

    /**
     * ISO 8601 날짜 문자열을 YYYY-MM-DD HH:mm 형식으로 변환
     * @param {string} dateString - ISO 8601 형식의 날짜 문자열 (예: "2025-11-14T10:30:00")
     * @returns {string} 포맷팅된 날짜 문자열 (예: "2025-11-14 10:30")
     *
     * 동작 과정:
     * 1. Date 객체로 파싱
     * 2. 각 필드를 2자리로 패딩 (padStart 사용)
     * 3. YYYY-MM-DD HH:mm 형식으로 조합
     *
     * 주의사항:
     * - 타임존 변환은 하지 않음 (서버와 클라이언트가 동일한 타임존 가정)
     * - 잘못된 날짜 문자열이 들어오면 "Invalid Date" 반환
     */
    function formatDateTime(dateString) {
        if (!dateString) {
            return '-';
        }

        try {
            const date = new Date(dateString);

            // Invalid Date 체크
            if (isNaN(date.getTime())) {
                return '-';
            }

            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');

            return `${year}-${month}-${day} ${hours}:${minutes}`;
        } catch (error) {
            console.error('Date formatting error:', error);
            return '-';
        }
    }

    // ======================================================================
    // 테이블 렌더링 함수
    // ======================================================================

    /**
     * Host 테이블 렌더링
     * @param {Array} hosts - Host 목록 배열
     *
     * 테이블 컬럼 구성:
     * 1. ID: host.id (숫자)
     * 2. 호스트명: host.name (문자열, XSS 방지를 위해 escapeHtml 적용)
     * 3. 스페이스 개수: host.spaceIds.length (배열의 길이만 표시)
     * 4. 생성일: host.createdAt (formatDateTime으로 포맷팅)
     *
     * 빈 상태 처리:
     * - hosts가 비어있으면 "No Hosts Found" 메시지 표시
     * - 사용자가 데이터가 없음을 명확히 알 수 있도록 아이콘과 메시지 제공
     */
    function renderHostsTable(hosts) {
        // 데이터가 없는 경우
        if (!hosts || hosts.length === 0) {
            hostsTableBody.innerHTML = `
                <tr>
                    <td colspan="4" style="text-align: center; padding: 3rem; color: var(--text-secondary);">
                        <div class="empty-state">
                            <div class="empty-state-icon">👤</div>
                            <h3>No Hosts Found</h3>
                            <p>There are no hosts to display.</p>
                        </div>
                    </td>
                </tr>
            `;
            return;
        }

        /**
         * 각 호스트를 테이블 행(tr)으로 변환
         * - map으로 배열을 순회하며 HTML 문자열 생성
         * - join('')으로 하나의 문자열로 합침
         * - innerHTML에 할당하여 DOM에 렌더링
         */
        const rows = hosts.map(host => {
            /**
             * 스페이스 개수 계산
             * - spaceIds는 배열이므로 .length로 개수 추출
             * - 배열 자체를 렌더링하면 안 됨 (요구사항 명시)
             * - 방어적 코드: spaceIds가 없거나 배열이 아닌 경우 0으로 표시
             */
            const spaceCount = Array.isArray(host.spaceIds) ? host.spaceIds.length : 0;

            /**
             * HTML 템플릿 리터럴로 테이블 행 생성
             * - XSS 방지: escapeHtml 함수로 사용자 입력값 이스케이프
             * - 날짜 포맷팅: formatDateTime 함수 사용
             */
            return `
                <tr>
                    <td>${host.id}</td>
                    <td>${escapeHtml(host.name)}</td>
                    <td style="text-align: center;">${spaceCount}</td>
                    <td>${formatDateTime(host.createdAt)}</td>
                </tr>
            `;
        }).join('');

        hostsTableBody.innerHTML = rows;
    }

    // ======================================================================
    // 페이지네이션 함수
    // ======================================================================

    /**
     * 페이지네이션 UI 업데이트
     *
     * PaginationUtil을 사용하여 숫자 페이지 네비게이션을 렌더링합니다.
     * - 현재 페이지, 전체 페이지, 전체 아이템 개수를 표시
     * - 페이지 클릭 시 goToPage 함수 호출
     * - « ‹ 1 2 3 4 5 › » 형태의 버튼 렌더링
     */
    function updatePagination() {
        PaginationUtil.render(
            paginationContainer,
            currentPage,
            totalPages,
            totalCount,
            goToPage
        );
    }

    // ======================================================================
    // API 호출 함수
    // ======================================================================

    /**
     * Host 목록 로드
     *
     * 동작 흐름:
     * 1. 에러 메시지 숨김 (이전 에러 제거)
     * 2. 로딩 스피너 표시
     * 3. API 호출 (api.js의 API.getHosts 사용)
     * 4. 성공 시:
     *    - 전역 상태 업데이트 (currentPage, totalPages, totalCount 등)
     *    - 테이블 렌더링
     *    - 페이지네이션 업데이트
     * 5. 실패 시:
     *    - 에러 메시지 표시
     *    - 콘솔에 에러 로그 출력
     * 6. 완료 시 (성공/실패 무관):
     *    - 로딩 스피너 숨김
     *
     * 에러 처리:
     * - API.getHosts는 401 에러를 자동으로 처리 (Token Refresh)
     * - 네트워크 에러, 서버 에러 등은 catch에서 처리
     * - 사용자 친화적인 메시지 표시
     */
    async function loadHosts() {
        hideError();
        showLoading();

        try {
            const response = await API.getHosts(currentPage, currentPageSize);

            // API 응답 데이터로 전역 상태 업데이트
            currentPage = response.currentPage;
            currentPageSize = response.pageSize;
            totalPages = response.totalPages;
            totalCount = response.totalCount;

            // 테이블 렌더링
            renderHostsTable(response.hosts);

            // 페이지네이션 업데이트
            updatePagination();

        } catch (error) {
            console.error('Failed to load hosts:', error);
            showError(error.message || 'Failed to load hosts. Please try again.');
        } finally {
            hideLoading();
        }
    }

    /**
     * 페이지 이동
     *
     * @param {number} page - 이동할 페이지 번호
     *
     * 동작:
     * - 유효성 검사: page가 1 ~ totalPages 범위 내인지 확인
     * - 범위를 벗어나면 무시 (아무 동작도 하지 않음)
     * - 유효한 경우 currentPage를 업데이트하고 데이터 재로드
     * - PaginationUtil에서 페이지 버튼 클릭 시 이 함수가 호출됨
     */
    function goToPage(page) {
        if (page < 1 || page > totalPages) {
            return;
        }
        currentPage = page;
        loadHosts();
    }

    // ======================================================================
    // 유틸리티 함수
    // ======================================================================

    /**
     * HTML 이스케이프 (XSS 방지)
     * @param {string} text - 이스케이프할 텍스트
     * @returns {string} 이스케이프된 텍스트
     *
     * XSS(Cross-Site Scripting) 공격 방지:
     * - 사용자 입력값(host.name 등)을 HTML에 렌더링할 때 필수
     * - <script>alert('xss')</script> 같은 악의적인 코드가 실행되지 않도록 이스케이프
     * - &, <, >, ", '를 HTML 엔티티로 변환
     *
     * 예시:
     * - escapeHtml('<script>') => '&lt;script&gt;'
     * - escapeHtml('A & B') => 'A &amp; B'
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

    // ======================================================================
    // 이벤트 리스너 등록
    // ======================================================================

    /**
     * 페이지 크기 변경 핸들러
     * - select box 값이 변경되면 호출됩니다.
     * - currentPageSize를 업데이트하고 첫 페이지로 이동합니다.
     * - 페이지 크기가 변경되면 현재 페이지 번호는 의미가 없으므로 1페이지로 리셋
     */
    function handlePageSizeChange() {
        currentPageSize = parseInt(pageSizeSelect.value);
        currentPage = 1; // 첫 페이지로 리셋
        loadHosts();
    }

    /**
     * 로그아웃 핸들러
     * - 확인 대화상자를 표시하여 실수로 로그아웃하는 것을 방지합니다.
     * - 확인 시 Auth.logout() 호출 (토큰 삭제 + 로그인 페이지 이동)
     */
    function handleLogout() {
        if (confirm('Are you sure you want to logout?')) {
            Auth.logout();
        }
    }

    // 이벤트 리스너 등록
    pageSizeSelect.addEventListener('change', handlePageSizeChange);
    logoutBtn.addEventListener('click', handleLogout);

    /**
     * 키보드 네비게이션
     * - 좌측 화살표: 이전 페이지
     * - 우측 화살표: 다음 페이지
     *
     * 접근성 향상:
     * - 마우스 없이도 키보드로 페이지 이동 가능
     * - preventDefault()로 브라우저 기본 동작(스크롤 등) 방지
     */
    document.addEventListener('keydown', function(event) {
        // 좌측 화살표: 이전 페이지
        if (event.key === 'ArrowLeft' && currentPage > 1) {
            event.preventDefault();
            goToPage(currentPage - 1);
        }
        // 우측 화살표: 다음 페이지
        else if (event.key === 'ArrowRight' && currentPage < totalPages) {
            event.preventDefault();
            goToPage(currentPage + 1);
        }
    });

    // ======================================================================
    // 초기 로드
    // ======================================================================

    /**
     * 페이지 로드 시 첫 번째 페이지의 데이터를 자동으로 가져옵니다.
     * - DOMContentLoaded 이벤트가 발생한 후 실행
     * - 사용자가 페이지를 열면 즉시 데이터를 볼 수 있습니다.
     */
    loadHosts();
});
