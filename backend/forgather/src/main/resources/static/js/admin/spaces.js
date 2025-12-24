/**
 * Spaces Management Page Script
 * Space 목록 조회 및 페이지네이션 처리
 */

// 전역 상태
let currentPage = 1;
let currentPageSize = 15;
let totalPages = 1;
let totalCount = 0;

/**
 * 현재 선택된 필터 상태를 관리하는 객체
 *
 * 필터 조건 확장 가이드:
 * - 새로운 필터를 추가할 때는 이 객체에 프로퍼티를 추가한다.
 * - 예: { hasProduct: true, isPublic: true, hostName: '홍길동' }
 * - 각 프로퍼티의 초기값은 null 또는 적절한 기본값으로 설정
 *
 * hasProduct 필터 값:
 * - null: 전체 (필터 없음)
 * - true: 작품 소개 등록함
 * - false: 작품 소개 등록하지 않음
 */
const filterState = {
    hasProduct: null
};

document.addEventListener('DOMContentLoaded', function () {
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
     * 날짜/시간 포맷팅 함수
     *
     * @param {string} dateTimeString - ISO 8601 형식의 날짜/시간 문자열 (예: "2025-01-15T10:30:45")
     * @returns {string} 포맷된 날짜/시간 문자열 (예: "2025-01-15 10:30:45")
     *
     * 동작:
     * - LocalDateTime을 yyyy-MM-dd HH:mm:ss 형식으로 변환
     * - 입력값이 없거나 유효하지 않으면 "-" 반환 (fallback)
     * - 서버 타임존 그대로 표시 (별도 변환 없음)
     *
     * 사용 예시:
     * formatDateTime("2025-01-15T10:30:45") → "2025-01-15 10:30:45"
     * formatDateTime(null) → "-"
     */
    function formatDateTime(dateTimeString) {
        if (!dateTimeString) {
            return '-';
        }

        try {
            // LocalDateTime 형식: "2025-01-15T10:30:45"를 파싱
            const date = new Date(dateTimeString);

            // 유효한 날짜인지 확인
            if (isNaN(date.getTime())) {
                return '-';
            }

            // yyyy-MM-dd HH:mm:ss 형식으로 변환
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');

            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        } catch (error) {
            console.error('Date formatting error:', error);
            return '-';
        }
    }

    /**
     * Space 테이블 렌더링
     *
     * @param {Array} spaces - Space 목록 (SimpleSpaceResponse[] 형태)
     *
     * SimpleSpaceResponse 구조:
     * - id: 스페이스 ID (숫자)
     * - code: 스페이스 코드 (문자열, 예: "e3f6b97f19")
     * - name: 스페이스 이름 (문자열)
     * - isPublic: 공개 여부 (boolean)
     * - createdAt: 생성 시간 (ISO 8601 문자열)
     * - updatedAt: 수정 시간 (ISO 8601 문자열)
     *
     * 동작:
     * - 데이터가 없으면 Empty State 표시
     * - 각 행을 동적으로 생성하여 tbody에 삽입
     * - XSS 방지를 위해 escapeHtml 적용
     * - 날짜/시간은 formatDateTime 함수로 포맷팅
     */
    function renderSpacesTable(spaces) {
        if (!spaces || spaces.length === 0) {
            spacesTableBody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align: center; padding: 3rem; color: var(--text-secondary);">
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
            // Public/Private 상태를 Badge로 표시
            const publicBadge = space.isPublic
                ? '<span class="badge badge-success">Public</span>'
                : '<span class="badge badge-danger">Private</span>';

            /**
             * data-space-code 속성 추가
             * - 클릭 시 이벤트 위임 패턴으로 spaceCode를 읽어옴
             * - HTML 속성으로 저장하므로 XSS 방지를 위해 escapeHtml 적용
             */
            return `
                <tr>
                    <td>${space.id}</td>
                    <td data-space-code="${escapeHtml(space.code)}">${escapeHtml(space.code)}</td>
                    <td>${escapeHtml(space.name)}</td>
                    <td style="text-align: center;">${publicBadge}</td>
                    <td>${formatDateTime(space.createdAt)}</td>
                    <td>${formatDateTime(space.updatedAt)}</td>
                </tr>
            `;
        }).join('');

        spacesTableBody.innerHTML = rows;
    }

    /**
     * 페이지네이션 UI 업데이트
     *
     * PaginationUtil을 사용하여 숫자 페이지 네비게이션을 렌더링합니다.
     * - 현재 페이지, 전체 페이지, 전체 아이템 개수를 표시
     * - 페이지 클릭 시 goToPage 함수 호출
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

    /**
     * 필터 조건 유무를 확인한다
     *
     * @returns {boolean} 필터 조건이 하나라도 있으면 true, 모두 없으면 false
     *
     * 동작:
     * - filterState 객체의 모든 프로퍼티를 확인
     * - null이 아닌 값이 하나라도 있으면 필터가 설정된 것으로 판단
     * - 모든 값이 null이면 필터 없음 (전체 조회)
     *
     * 확장 포인트:
     * - 새로운 필터를 추가해도 이 함수는 수정할 필요 없음
     * - filterState 객체만 업데이트하면 자동으로 처리됨
     */
    function hasActiveFilters() {
        return Object.values(filterState).some(value => value !== null);
    }

    /**
     * Space 목록 로드
     *
     * 호출 시점:
     * - 페이지 최초 로드 (DOMContentLoaded)
     * - 필터 검색 버튼 클릭 (applyFilter)
     * - 페이지 크기 변경 (handlePageSizeChange)
     * - 페이지네이션 버튼 클릭 (goToPage)
     *
     * API 엔드포인트 분기 규칙:
     * - 필터 조건이 하나라도 있으면 → /admin/spaces/search
     * - 필터 조건이 없으면 (전체) → /admin/spaces
     *
     * 동작 흐름:
     * 1. 필터 조건 유무 확인 (hasActiveFilters)
     * 2. 조건에 따라 적절한 API 호출
     * 3. 응답 데이터로 테이블 렌더링
     * 4. 페이지네이션 UI 업데이트
     */
    async function loadSpaces() {
        hideError();
        showLoading();

        try {
            let response;

            // 필터 조건이 있는지 확인
            if (hasActiveFilters()) {
                // 필터링 API 호출 (/admin/spaces/search)
                response = await API.getSpacesByFilters(currentPage, currentPageSize, filterState);
            } else {
                // 전체 조회 API 호출 (/admin/spaces)
                response = await API.getSpaces(currentPage, currentPageSize);
            }

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
     *
     * @param {number} page - 이동할 페이지 번호
     *
     * 동작:
     * - 유효한 페이지 범위인지 확인 (1 ~ totalPages)
     * - 유효하면 currentPage를 업데이트하고 데이터 재로드
     * - PaginationUtil에서 페이지 버튼 클릭 시 이 함수가 호출됨
     */
    function goToPage(page) {
        if (page < 1 || page > totalPages) {
            return;
        }
        currentPage = page;
        loadSpaces();
    }

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

    /**
     * 필터 적용 함수
     *
     * 호출 시점:
     * - 사용자가 필터를 선택하고 [검색] 버튼을 클릭했을 때
     *
     * 동작 흐름:
     * 1. HTML에서 선택된 radio 버튼의 value를 읽어온다
     * 2. value를 적절한 타입으로 변환 ('all' → null, 'true' → true, 'false' → false)
     * 3. filterState 객체에 저장
     * 4. 페이지를 1페이지로 초기화 (필터 변경 시 항상 첫 페이지부터 시작)
     * 5. loadSpaces() 호출하여 목록 갱신
     *
     * 확장 포인트:
     * - 새로운 필터를 추가할 때 이 함수에서 해당 필터 값을 읽어서 filterState에 추가
     * - 예시:
     *   ```javascript
     *   const isPublic = document.querySelector('input[name="isPublic"]:checked').value;
     *   filterState.isPublic = isPublic === 'all' ? null : isPublic === 'true';
     *   ```
     */
    function applyFilter() {
        // Optional Chaining (?.)으로 안전하게 접근 후, Nullish Coalescing (??)으로 기본값 설정
        const hasProductValue = document.querySelector('input[name="hasProduct"]:checked')?.value ?? 'all';

        // 매핑 로직 개선 (객체 리터럴 활용으로 if-else 제거)
        const filterMap = {
            'all': null,
            'true': true,
            'false': false
        };
        filterState.hasProduct = filterMap[hasProductValue];

        // 필터 변경 시 페이지를 1페이지로 초기화
        currentPage = 1;

        // 목록 갱신
        loadSpaces();
    }

    // 이벤트 리스너 등록
    pageSizeSelect.addEventListener('change', handlePageSizeChange);
    logoutBtn.addEventListener('click', handleLogout);

    /**
     * 필터 검색 버튼 클릭 이벤트 리스너
     * - [검색] 버튼 클릭 시 필터 적용 함수 호출
     */
    const applyFilterBtn = document.getElementById('applyFilterBtn');
    if (applyFilterBtn) {
        applyFilterBtn.addEventListener('click', applyFilter);
    }

    /**
     * 키보드 네비게이션
     * - 좌측 화살표: 이전 페이지
     * - 우측 화살표: 다음 페이지
     *
     * 접근성 향상을 위한 기능
     */
    document.addEventListener('keydown', function (event) {
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

    // ==========================================================================
    // Modal Logic - Space Detail
    // ==========================================================================

    /**
     * 모달 관련 DOM 요소 참조
     * - 한 번만 querySelector로 찾아서 재사용 (성능 최적화)
     */
    const modal = document.getElementById('spaceDetailModal');
    const modalLoading = document.getElementById('modalLoading');
    const modalError = document.getElementById('modalError');
    const modalContent = document.getElementById('modalContent');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const visitSpaceBtn = document.getElementById('visitSpaceBtn');

    // 모달 내 데이터 표시 요소들
    const modalSpaceId = document.getElementById('modalSpaceId');
    const modalSpaceCode = document.getElementById('modalSpaceCode');
    const modalSpaceName = document.getElementById('modalSpaceName');
    const modalSpacePublic = document.getElementById('modalSpacePublic');
    const modalHasProduct = document.getElementById('modalHasProduct');
    const modalGuestBookCount = document.getElementById('modalGuestBookCount');

    /**
     * 현재 열려있는 스페이스 코드를 저장
     * - Visit Space Page 버튼 클릭 시 사용
     * - null이면 모달이 닫혀있음을 의미
     */
    let currentOpenSpaceCode = null;

    /**
     * 모달 열기
     * - CSS의 .show 클래스를 추가하여 페이드 인 애니메이션 실행
     * - body에 modal-open 클래스를 추가하여 배경 스크롤 방지
     */
    function openModal() {
        modal.style.display = 'flex';
        // 다음 프레임에서 show 클래스 추가 (CSS 애니메이션을 위함)
        requestAnimationFrame(() => {
            modal.classList.add('show');
        });
        document.body.classList.add('modal-open');
    }

    /**
     * 모달 닫기
     * - CSS의 .show 클래스를 제거하여 페이드 아웃 애니메이션 실행
     * - 애니메이션 완료 후 display: none 처리
     * - body의 modal-open 클래스 제거하여 배경 스크롤 복원
     */
    function closeModal() {
        modal.classList.remove('show');
        document.body.classList.remove('modal-open');
        currentOpenSpaceCode = null;

        // 애니메이션 완료 후 display: none (300ms는 CSS transition과 동일)
        setTimeout(() => {
            modal.style.display = 'none';
            // 모달 내용 초기화
            resetModalContent();
        }, 300);
    }

    /**
     * 모달 내용 초기화
     * - 다음에 모달을 열 때 이전 데이터가 보이지 않도록 숨김 처리
     */
    function resetModalContent() {
        modalLoading.style.display = 'none';
        modalError.style.display = 'none';
        modalContent.style.display = 'none';
        visitSpaceBtn.style.display = 'none';
    }

    /**
     * 모달에 로딩 상태 표시
     */
    function showModalLoading() {
        resetModalContent();
        modalLoading.style.display = 'flex';
    }

    /**
     * 모달에 에러 메시지 표시
     * @param {string} message - 표시할 에러 메시지
     */
    function showModalError(message) {
        resetModalContent();
        modalError.textContent = message;
        modalError.style.display = 'block';
    }

    /**
     * 모달에 스페이스 상세 정보 표시
     *
     * API: GET /admin/spaces/{spaceCode}
     * @param {object} data - API 응답 데이터 (SpaceDetailResponse)
     * @param {object} data.space - 스페이스 기본 정보 (SimpleSpaceResponse)
     * @param {number} data.productCount - 등록한 작품 소개 개수
     * @param {number} data.guestBookCount - 방명록 개수
     */
    function showModalContent(data) {
        resetModalContent();

        // 스페이스 기본 정보 표시
        modalSpaceId.textContent = data.space.id;
        modalSpaceCode.textContent = data.space.code;
        modalSpaceName.textContent = data.space.name;

        // Public 상태를 Badge로 표시
        const publicBadge = data.space.isPublic
            ? '<span class="badge badge-success">Public</span>'
            : '<span class="badge badge-danger">Private</span>';
        modalSpacePublic.innerHTML = publicBadge;

        /**
         * 작품 소개 등록 상태 표시
         * - productCount가 0: "작품 소개를 등록하지 않음" (회색 텍스트)
         * - productCount가 1 이상: "등록한 작품 소개 N개" (녹색 텍스트, 숫자 포맷팅 적용)
         */
        const productStatusText = data.productCount === 0
            ? '<span style="color: var(--text-muted);">작품 소개를 등록하지 않음</span>'
            : `<span style="color: var(--success-color); font-weight: 600;">${data.productCount.toLocaleString()}개</span>`;
        modalHasProduct.innerHTML = productStatusText;

        // 방명록 개수 표시 (숫자 포맷팅)
        modalGuestBookCount.textContent = data.guestBookCount.toLocaleString();

        // 콘텐츠와 버튼 표시
        modalContent.style.display = 'flex';
        visitSpaceBtn.style.display = 'block';
    }

    /**
     * 스페이스 상세 정보 로드
     *
     * @param {string} spaceCode - 조회할 스페이스 코드
     *
     * 동작 흐름:
     * 1. 모달 열기 및 로딩 표시
     * 2. API 호출
     * 3. 성공 시 데이터 표시, 실패 시 에러 표시
     *
     * 주의:
     * - 비동기 함수이므로 await 필요
     * - API 에러는 try-catch로 처리하여 사용자에게 친절한 메시지 표시
     */
    async function loadSpaceDetail(spaceCode) {
        currentOpenSpaceCode = spaceCode;
        openModal();
        showModalLoading();

        try {
            const data = await API.getSpaceDetail(spaceCode);
            showModalContent(data);
        } catch (error) {
            console.error('Failed to load space detail:', error);
            showModalError(error.message || 'Failed to load space details. Please try again.');
        }
    }

    /**
     * 게스트 페이지 방문 URL 생성
     *
     * @param {string} spaceCode - 스페이스 코드
     * @returns {string} 게스트 페이지 URL
     *
     * 환경별 도메인 매핑:
     * - API 호출 도메인 (현재 페이지 hostname 기준)
     *   - localhost:8080 → 로컬 환경
     *   - api.dev.forgather.app → 개발 환경
     *   - api.forgather.app → 운영 환경
     *
     * - 게스트 페이지 도메인 (api. 접두사 제거)
     *   - 로컬 환경 → dev.forgather.app (개발 환경과 동일)
     *   - 개발 환경 → dev.forgather.app
     *   - 운영 환경 → forgather.app
     *
     * URL 형식: https://{guestDomain}/guest/{spaceCode}/home
     *
     * 주의:
     * - 백오피스는 항상 api. 서브도메인에서 실행됨
     * - 게스트 페이지는 api. 없이 메인 도메인에서 실행됨
     * - 로컬 개발 시에는 개발 환경으로 리다이렉트
     */
    function getSpacePageUrl(spaceCode) {
        const hostname = window.location.hostname;

        let guestDomain;

        // 환경별 게스트 페이지 도메인 결정
        if (hostname === 'api.forgather.app') {
            // 운영 환경: api.forgather.app → forgather.app
            guestDomain = 'forgather.app';
        } else if (hostname === 'api.dev.forgather.app') {
            // 개발 환경: api.dev.forgather.app → dev.forgather.app
            guestDomain = 'dev.forgather.app';
        } else {
            // 로컬 환경 (localhost 등): 개발 환경으로 고정
            guestDomain = 'dev.forgather.app';
        }

        return `https://${guestDomain}/guest/${spaceCode}/home`;
    }

    /**
     * Code 컬럼 클릭 이벤트 핸들러 (이벤트 위임 패턴)
     *
     * 이벤트 위임 패턴을 사용하는 이유:
     * - 테이블 행이 동적으로 생성되므로 각 행에 개별 이벤트 리스너를 달면 메모리 낭비
     * - tbody에 한 번만 이벤트 리스너를 등록하고, 클릭된 요소가 Code 컬럼인지 확인
     * - 페이징으로 DOM이 재생성되어도 이벤트 리스너를 다시 등록할 필요 없음
     *
     * 동작 과정:
     * 1. tbody의 어딘가를 클릭하면 이 핸들러가 실행됨
     * 2. 클릭된 요소(event.target)가 Code 컬럼(td:nth-child(2))인지 확인
     * 3. Code 컬럼이면 data-space-code 속성에서 spaceCode를 읽어옴
     * 4. loadSpaceDetail 함수를 호출하여 모달 표시
     */
    spacesTableBody.addEventListener('click', function (event) {
        // 클릭된 요소가 td인지, 그리고 두 번째 컬럼(Code)인지 확인
        const target = event.target;

        // td가 아니거나 data-space-code 속성이 없으면 무시
        if (target.tagName !== 'TD' || !target.hasAttribute('data-space-code')) {
            return;
        }

        const spaceCode = target.getAttribute('data-space-code');
        if (spaceCode) {
            loadSpaceDetail(spaceCode);
        }
    });

    /**
     * 게스트 페이지로 이동 버튼 클릭 핸들러
     *
     * 동작:
     * - 현재 모달에 표시된 스페이스의 게스트 페이지를 새 탭에서 열기
     * - window.open의 두 번째 인자 '_blank'로 새 탭 열기
     * - noopener, noreferrer 옵션으로 보안 강화
     *   (새 탭이 원본 페이지에 접근하지 못하도록 window.opener 차단)
     *
     * 참고:
     * - currentOpenSpaceCode는 모달을 열 때 설정됨 (loadSpaceDetail 함수)
     * - URL 생성은 getSpacePageUrl 함수가 담당 (환경별 도메인 처리)
     */
    visitSpaceBtn.addEventListener('click', function () {
        if (currentOpenSpaceCode) {
            const url = getSpacePageUrl(currentOpenSpaceCode);
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    });

    /**
     * 모달 닫기 버튼 클릭 핸들러
     */
    closeModalBtn.addEventListener('click', function () {
        closeModal();
    });

    /**
     * 모달 오버레이 클릭 시 닫기
     * - 모달 배경(검은색 반투명 영역)을 클릭하면 모달 닫기
     * - 모달 내용 영역(.modal-container)을 클릭하면 닫히지 않도록 처리
     *
     * event.target vs event.currentTarget:
     * - event.target: 실제 클릭된 요소 (모달 내용 또는 오버레이)
     * - event.currentTarget: 이벤트 리스너가 등록된 요소 (항상 modal)
     * - 둘이 같다는 것은 오버레이를 직접 클릭했다는 의미
     */
    modal.addEventListener('click', function (event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    /**
     * ESC 키로 모달 닫기
     * - 키보드 접근성 향상
     * - 모달이 열려있을 때만 동작 (modal.classList.contains('show'))
     */
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // 초기 로드
    loadSpaces();
});
