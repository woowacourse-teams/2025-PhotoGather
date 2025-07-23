import { parsedImagePath } from '../src/utils/parsedImagePath';

describe('parsedImagePath 테스트', () => {
  it('이미지의 형식과 경로를 파싱하여 맨 마지막 image 경로만 반환한다', () => {
    const imagePath =
      'https://example.com/image1.jpg,https://example.com/image2.jpg,https://example.com/image3.jpg';
    const expected = 'image3';
    const result = parsedImagePath(imagePath);
    expect(result).toBe(expected);
  });
});
