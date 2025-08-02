import { checkIsPastDateTime } from '../src/utils/checkIsPastDateTime';

beforeAll(() => {
  const fixedNow = new Date('2025-07-31T10:00:00Z').getTime();
  global.Date.now = () => fixedNow;
});

afterAll(() => {
  jest.useRealTimers();
});

describe('checkIsPastDateTime 유틸 테스트', () => {
  it.each([
    ['2025-07-30', '19:00', true],
    ['2025-07-31', '18:59', true],
    ['2025-07-31', '19:01', false],
    ['2025-07-31', '19:00', false],
  ])(
    '날짜(%s)와 시간 정보(%s)를 받아 현재 시간보다 과거 시간대인지 확인한다.',
    (date, time, result) => {
      expect(checkIsPastDateTime(date, time)).toBe(result);
    },
  );
});
