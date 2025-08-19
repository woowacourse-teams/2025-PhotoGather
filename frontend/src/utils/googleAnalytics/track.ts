import ReactGA from 'react-ga4';

interface buttonProps {
  page: string;
  section: string;
  action: string;
}

export const track = {
  sectionView: (name: string, index?: number) =>
    ReactGA.event('landing_section_view', { section_name: name, index }),

  button: (element_id: string, { page, section, action }: buttonProps) => {
    ReactGA.event('button_click', {
      element_id, // 고유 식별자
      page, // 매니저 or 게스트
      section, // 페이지 안에서의 영역
      action, // 동작
    });
  },
};
