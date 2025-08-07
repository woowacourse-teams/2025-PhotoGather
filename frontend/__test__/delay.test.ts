import { delay } from '../src/utils/delay';

jest.useFakeTimers();

describe('delay 함수 테스트', () => {
  it('지정한 시간(ms)만큼 기다린 후에 resolve 되어야 한다', async () => {
    const callback = jest.fn();

    delay(3000).then(callback);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(3000);
    await Promise.resolve();

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
