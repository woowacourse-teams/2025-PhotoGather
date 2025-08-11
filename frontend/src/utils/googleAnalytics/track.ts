import ReactGA from 'react-ga4';

export const track = {
  sectionView: (name: string, index?: number) =>
    ReactGA.event('landing_section_view', { section_name: name, index }),
};
