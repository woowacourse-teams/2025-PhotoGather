import { hexToRgba } from '../src/utils/hexToRgba';

describe('hexToRgba', () => {
  it('hex 색상을 rgba로 변환한다', () => {
    expect(hexToRgba('#FF0000')).toBe('rgba(255, 0, 0, 1)');
    expect(hexToRgba('#00FF00')).toBe('rgba(0, 255, 0, 1)');
    expect(hexToRgba('#0000FF')).toBe('rgba(0, 0, 255, 1)');
    expect(hexToRgba('#FFFFFF')).toBe('rgba(255, 255, 255, 1)');
    expect(hexToRgba('#000000')).toBe('rgba(0, 0, 0, 1)');
  });

  it('# 없는 hex 값도 처리한다', () => {
    expect(hexToRgba('FF0000')).toBe('rgba(255, 0, 0, 1)');
    expect(hexToRgba('00FF00')).toBe('rgba(0, 255, 0, 1)');
  });

  it('소문자 hex 값도 처리한다', () => {
    expect(hexToRgba('#ff0000')).toBe('rgba(255, 0, 0, 1)');
    expect(hexToRgba('aabbcc')).toBe('rgba(170, 187, 204, 1)');
  });

  it('alpha 값을 설정할 수 있다', () => {
    expect(hexToRgba('#000000', 0)).toBe('rgba(0, 0, 0, 0)');
    expect(hexToRgba('#FFFFFF', 0.5)).toBe('rgba(255, 255, 255, 0.5)');
    expect(hexToRgba('#FF0000', 0.25)).toBe('rgba(255, 0, 0, 0.25)');
  });

  it('alpha 값이 없으면 기본값 1을 사용한다', () => {
    expect(hexToRgba('#000000')).toBe('rgba(0, 0, 0, 1)');
  });
});
