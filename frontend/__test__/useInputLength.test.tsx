import { renderHook } from '@testing-library/react';
import { act } from 'react';
import useInputLength from '../src/hooks/useInputLength';

describe('useInputLength', () => {
  it('value가 maxCount보다 길면 splicedValue는 maxCount만큼 잘린다.', () => {
    const { result } = renderHook(() =>
      useInputLength({ value: '1234567890', maxCount: 5 }),
    );

    expect(result.current.splicedValue).toBe('12345');
  });

  it('maxCount보다 짧은 길이일 경우 자르지 않는다.', () => {
    const inputValue = '가나다라ㅁ';
    const expectedValue = '가나다라ㅁ';

    const { result } = renderHook(() =>
      useInputLength({ value: inputValue, maxCount: 5 }),
    );

    expect(result.current.splicedValue).toBe(expectedValue);
  });

  it('조합되지 않은 글자가 maxCount를 넘으면 잘린다.', () => {
    const inputValue = '가나다라마ㅂ';
    const expectedValue = '가나다라마';
    const { result } = renderHook(() =>
      useInputLength({ value: inputValue, maxCount: 5 }),
    );

    act(() => {
      result.current.handleCompositionStart();
    });

    expect(result.current.splicedValue).toBe(expectedValue);
  });

  it('조합이 끝난 글자가 maxCount를 넘으면 잘린다.', () => {
    const inputValue = '가나다라마바사아자차카타파하';
    const expectedValue = '가나다라마';
    const { result } = renderHook(() =>
      useInputLength({ value: inputValue, maxCount: 5 }),
    );

    const mockEvent = {
      currentTarget: { value: inputValue },
    } as React.CompositionEvent<HTMLInputElement>;

    act(() => {
      result.current.handleCompositionEnd(mockEvent);
    });

    expect(result.current.splicedValue).toBe(expectedValue);
  });
});
