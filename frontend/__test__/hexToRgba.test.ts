import { hexToRgba } from '../src/utils/hexToRgba';

test('renders hello text', () => {
  const rgba = hexToRgba('#FFFFFF', 0);
  expect(rgba).toBe('rgba(255, 255, 255, 0)');
  expect(rgba).toBe('rgba(10, 255, 255, 0)');
});
