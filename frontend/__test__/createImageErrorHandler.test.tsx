import { createImageErrorHandler } from '../src/utils/createImageErrorHandler';

describe('createImageErrorHandler 유틸 함수 테스트', () => {
  const defaultImageSrc = 'default.jpg';
  let handler: ReturnType<typeof createImageErrorHandler>;
  let mockImage: HTMLImageElement;
  let syntheticEvent: React.SyntheticEvent<HTMLImageElement, Event>;

  beforeEach(() => {
    handler = createImageErrorHandler(defaultImageSrc);
    mockImage = document.createElement('img');
    syntheticEvent = { target: mockImage } as unknown as React.SyntheticEvent<
      HTMLImageElement,
      Event
    >;
    mockImage.onerror = jest.fn();
    mockImage.src = 'original.jpg';
    mockImage.style.background = 'red';

    handler(syntheticEvent);
  });

  it('실행하면 에러 핸들러를 제거하는 에러 핸들러를 반환한다.', () => {
    expect(mockImage.onerror).toBeNull();
  });

  it('실행하면 defaultImage로 src를 바꾸는 에러 핸들러를 반환한다.', () => {
    expect(new URL(mockImage.src).pathname).toBe('/default.jpg');
  });

  it('실행하면 background를 없애는 에러 핸들러를 반환한다.', () => {
    expect(mockImage.style.background).toBe('none');
  });
});
