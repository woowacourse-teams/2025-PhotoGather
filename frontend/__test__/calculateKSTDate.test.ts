import { calculateKSTDate } from '../src/utils/calculateKSTDate';

beforeAll(() => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date('2025-07-30T18:00:00Z'));
});

afterAll(() => {
  jest.useRealTimers();
});

describe('calculateKSTDate 유틸 테스트', () => {
  it('KST 기준의 Date 객체를 받을 수 있다.', () => {
    const { kstDate } = calculateKSTDate();
    const expectedTime =
      new Date('2025-07-30T18:00:00Z').getTime() + 9 * 60 * 60 * 1000;
    expect(kstDate.getTime()).toBe(expectedTime);
  });

  it('KST 기준의 날짜 문자열를 받을 수 있다.', () => {
    const { kstDateString } = calculateKSTDate();
    expect(kstDateString).toBe('2025-07-31');
  });

  it('KST 기준의 시간 문자열를 받을 수 있다.', () => {
    const { kstTimeString } = calculateKSTDate();
    expect(kstTimeString).toBe('03:00');
  });
});
