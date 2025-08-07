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

  it('spaceId를 받아서 공유 URL을 클립보드에 복사한다', async () => {
    const writeTextMock = jest.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    const testSpaceId = 'test-space-id';
    await copyLinkToClipboard(testSpaceId);

    // createShareUrl 함수가 호출되어 올바른 URL이 생성되는지 확인
    expect(writeTextMock).toHaveBeenCalledWith(
      expect.stringContaining('/guest/image-upload/test-space-id'),
    );
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

    await copyLinkToClipboard('test-space-id');

    expect(writeTextMock).toHaveBeenCalled();
    expect(consoleLogSpy).toHaveBeenCalledWith(testError);
  });

  it('빈 spaceId도 복사할 수 있다', async () => {
    const writeTextMock = jest.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    await copyLinkToClipboard('');

    expect(writeTextMock).toHaveBeenCalledWith(
      expect.stringContaining('/guest/image-upload/'),
    );
  });
});
