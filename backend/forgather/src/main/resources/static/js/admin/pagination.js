/**
 * Pagination Utility Module
 * 숫자 페이지 네비게이션을 렌더링하는 공통 유틸리티
 *
 * 주요 기능:
 * - 숫자 페이지 버튼 렌더링 (1 2 3 4 5)
 * - 이전/다음 페이지 버튼
 * - 첫 페이지/마지막 페이지 이동 버튼
 * - 현재 페이지 강조 표시
 * - 페이지가 많을 경우 표시 범위 제한
 */

const PaginationUtil = {
    /**
     * 페이지네이션 UI를 렌더링한다
     *
     * @param {HTMLElement} container - 페이지네이션을 렌더링할 DOM 요소
     * @param {number} currentPage - 현재 페이지 번호 (1-based)
     * @param {number} totalPages - 전체 페이지 수
     * @param {number} totalCount - 전체 아이템 개수
     * @param {function} onPageClick - 페이지 클릭 시 호출될 콜백 함수 (pageNumber를 인자로 받음)
     * @param {object} options - 추가 옵션
     * @param {number} options.maxPageButtons - 표시할 최대 페이지 버튼 개수 (기본값: 5)
     *
     * 페이지 번호 표시 로직:
     * - 전체 페이지가 5개 이하면 모두 표시: [1] [2] [3] [4] [5]
     * - 현재 페이지 기준 앞뒤 2개씩 표시
     *   - 현재 페이지가 1~3: [1] [2] [3] [4] [5]
     *   - 현재 페이지가 중간: [3] [4] [5] [6] [7]
     *   - 현재 페이지가 끝부분: [6] [7] [8] [9] [10]
     *
     * 버튼 구성:
     * - « (첫 페이지로)
     * - ‹ (이전 페이지)
     * - 숫자 버튼들 (1 2 3 4 5)
     * - › (다음 페이지)
     * - » (마지막 페이지로)
     *
     * 주의사항:
     * - API는 1-based 페이지를 사용 (서버에서 0-based를 1-based로 변환하여 응답)
     * - UI도 1-based로 표시
     */
    render(container, currentPage, totalPages, totalCount, onPageClick, options = {}) {
        // 옵션 기본값 설정
        const maxPageButtons = options.maxPageButtons || 5;

        // 컨테이너 초기화
        container.innerHTML = '';

        // 데이터가 없으면 페이지네이션 숨김
        if (totalPages === 0) {
            container.style.display = 'none';
            return;
        }

        // 페이지네이션 표시
        container.style.display = 'flex';

        // 페이지 번호 범위 계산
        const pageRange = this._calculatePageRange(currentPage, totalPages, maxPageButtons);

        // 버튼 컨테이너 생성
        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'pagination-buttons';

        // 첫 페이지로 이동 버튼 (currentPage > 1일 때만 활성화)
        const firstBtn = this._createButton('«', currentPage === 1, () => onPageClick(1));
        firstBtn.setAttribute('aria-label', '첫 페이지로 이동');
        buttonsContainer.appendChild(firstBtn);

        // 이전 페이지 버튼
        const prevBtn = this._createButton('‹', currentPage === 1, () => onPageClick(currentPage - 1));
        prevBtn.setAttribute('aria-label', '이전 페이지');
        buttonsContainer.appendChild(prevBtn);

        // 숫자 페이지 버튼들
        for (let page = pageRange.start; page <= pageRange.end; page++) {
            const isActive = page === currentPage;
            const pageBtn = this._createButton(
                page.toString(),
                false,
                () => onPageClick(page),
                isActive
            );
            pageBtn.setAttribute('aria-label', `${page}페이지로 이동`);
            if (isActive) {
                pageBtn.setAttribute('aria-current', 'page');
            }
            buttonsContainer.appendChild(pageBtn);
        }

        // 다음 페이지 버튼
        const nextBtn = this._createButton('›', currentPage === totalPages, () => onPageClick(currentPage + 1));
        nextBtn.setAttribute('aria-label', '다음 페이지');
        buttonsContainer.appendChild(nextBtn);

        // 마지막 페이지로 이동 버튼
        const lastBtn = this._createButton('»', currentPage === totalPages, () => onPageClick(totalPages));
        lastBtn.setAttribute('aria-label', '마지막 페이지로 이동');
        buttonsContainer.appendChild(lastBtn);

        // 페이지 정보 표시 (Page 1 of 10 (Total: 150 items))
        const infoContainer = document.createElement('div');
        infoContainer.className = 'pagination-info';
        infoContainer.innerHTML = `
            Page <strong>${currentPage}</strong> of <strong>${totalPages}</strong>
            (Total: <strong>${totalCount.toLocaleString()}</strong> items)
        `;

        // DOM에 추가
        container.appendChild(buttonsContainer);
        container.appendChild(infoContainer);
    },

    /**
     * 표시할 페이지 번호 범위를 계산한다
     *
     * @param {number} currentPage - 현재 페이지
     * @param {number} totalPages - 전체 페이지 수
     * @param {number} maxButtons - 표시할 최대 버튼 개수
     * @returns {object} { start: 시작 페이지, end: 끝 페이지 }
     *
     * 계산 로직:
     * 1. 전체 페이지가 maxButtons 이하면 모두 표시
     * 2. 현재 페이지가 시작 부분이면 1부터 maxButtons까지
     * 3. 현재 페이지가 끝 부분이면 (totalPages - maxButtons + 1)부터 totalPages까지
     * 4. 현재 페이지가 중간이면 현재 페이지 기준 앞뒤로 배치
     */
    _calculatePageRange(currentPage, totalPages, maxButtons) {
        // 전체 페이지가 최대 버튼 개수 이하면 모두 표시
        if (totalPages <= maxButtons) {
            return { start: 1, end: totalPages };
        }

        // 현재 페이지 기준으로 앞뒤로 몇 개씩 표시할지 계산
        const half = Math.floor(maxButtons / 2);
        let start = currentPage - half;
        let end = currentPage + half;

        // 시작이 1보다 작으면 조정
        if (start < 1) {
            start = 1;
            end = maxButtons;
        }

        // 끝이 totalPages보다 크면 조정
        if (end > totalPages) {
            end = totalPages;
            start = totalPages - maxButtons + 1;
        }

        return { start, end };
    },

    /**
     * 페이지네이션 버튼을 생성한다
     *
     * @param {string} text - 버튼에 표시할 텍스트
     * @param {boolean} disabled - 비활성화 여부
     * @param {function} onClick - 클릭 이벤트 핸들러
     * @param {boolean} active - 활성 상태 여부 (현재 페이지)
     * @returns {HTMLButtonElement} 생성된 버튼 요소
     */
    _createButton(text, disabled, onClick, active = false) {
        const button = document.createElement('button');
        button.className = 'pagination-btn';
        button.textContent = text;
        button.disabled = disabled;

        // 현재 페이지는 active 클래스 추가
        if (active) {
            button.classList.add('active');
        }

        // 비활성화되지 않은 버튼에만 이벤트 리스너 추가
        if (!disabled) {
            button.addEventListener('click', onClick);
        }

        return button;
    }
};

// 전역 객체로 노출
window.PaginationUtil = PaginationUtil;
