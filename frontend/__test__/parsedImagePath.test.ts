import { parsedImagePath } from '../src/utils/parsedImagePath';

describe('parsedImagePath 테스트', () => {
  it('이미지의 형식과 경로를 파싱하여 맨 마지막 image 경로만 반환한다', () => {
    const imagePath = 'https://example.com/image3.jpg';
    const expected = 'image3';
    const result = parsedImagePath(imagePath);
    expect(result).toBe(expected);
  });

  it('파일명이 존재하지 않을 경우 빈 문자열을 반환한다', () => {
    const invalidPath = 'https://example.com/';
    const result = parsedImagePath(invalidPath);
    expect(result).toBe('');
  });

  it('파일명이 없이 확장자만 있을 경우 빈 문자열을 반환한다', () => {
    const invalidPath = '.jpg';
    const result = parsedImagePath(invalidPath);
    expect(result).toBe('');
  });

  it('지원하지 않는 확장자(.exe)인 경우 빈 문자열을 반환한다', () => {
    const result = parsedImagePath('https://example.com/file/virus.exe');
    expect(result).toBe('');
  });
});
