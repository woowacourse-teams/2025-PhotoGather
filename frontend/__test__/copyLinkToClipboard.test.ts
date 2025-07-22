import { copyLinkToClipboard } from '../src/utils/copyLinkToClipboard';

describe('copyLinkToClipboard 유틸 함수 테스트', () => {
  const originalClipboard = { ...global.navigator.clipboard };

  const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    Object.assign(navigator, {
      clipboard: originalClipboard,
    });
    consoleLogSpy.mockRestore();
  });

  it('텍스트를 클립보드에 복사한다', async () => {
    const writeTextMock = jest.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    const testText = 'https://example.com';
    await copyLinkToClipboard(testText);

    expect(writeTextMock).toHaveBeenCalledWith(testText);
    expect(writeTextMock).toHaveBeenCalledTimes(1);
  });

  it('복사 실패 시 에러를 콘솔로 출력한다', async () => {
    const testError = new Error('복사 실패');
    const writeTextMock = jest.fn().mockRejectedValue(testError);
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    await copyLinkToClipboard('https://example.com');

    expect(writeTextMock).toHaveBeenCalled();
    expect(consoleLogSpy).toHaveBeenCalledWith(testError);
  });

  it('빈 문자열도 복사할 수 있다', async () => {
    const writeTextMock = jest.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    await copyLinkToClipboard('');

    expect(writeTextMock).toHaveBeenCalledWith('');
  });
});
