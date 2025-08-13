import { parseIsoStringFromDateTime } from '../src/utils/parseIsoStringFromDateTime';

describe('parseIsoStringFromDateTime 유틸 테스트', () => {
  it('날짜와 시간 정보를 받아 ISO 형태의 문자열을 반환한다.', () => {
    const date = '2025-08-20';
    const time = '20:57';
    const result = '2025-08-20T20:57:00';

    expect(parseIsoStringFromDateTime(date, time)).toBe(result);
  });
});
