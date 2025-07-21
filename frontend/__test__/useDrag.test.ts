import { act, renderHook } from '@testing-library/react';
import { useDrag } from '../src/hooks/useDrag';

describe('useDrag 훅 테스트', () => {
  const mockEvent = (): React.DragEvent<HTMLLabelElement> =>
    ({
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    }) as unknown as React.DragEvent<HTMLLabelElement>;

  it('드래그 진입(onDragEnter) 시 isActive는 true여야 한다.', () => {
    const { result } = renderHook(() => useDrag({}));

    const stopEvent = mockEvent();

    act(() => {
      result.current.handleDragEnter(stopEvent);
    });
    expect(result.current.isActive).toBe(true);
  });

  it('드래그 요소 위에 있을(onDragOver) 시 기본 동작 방지 함수가 호출되어야 한다.', () => {
    const { result } = renderHook(() => useDrag({}));

    const stopEvent = mockEvent();

    act(() => {
      result.current.handleDragOver(stopEvent);
    });
    expect(stopEvent.preventDefault).toHaveBeenCalled();
    expect(stopEvent.stopPropagation).toHaveBeenCalled();
  });

  it('드래그 이탈(onDragLeave) 시 isActive는 false여야 한다.', () => {
    const { result } = renderHook(() => useDrag({}));

    const stopEvent = mockEvent();

    act(() => {
      result.current.handleDragLeave(stopEvent);
    });
    expect(result.current.isActive).toBe(false);
  });

  it('드롭 이벤트 발생 시 onDrop 콜백이 실행되고 isActive는 false여야 한다.', () => {
    const onDrop = jest.fn();
    const { result } = renderHook(() => useDrag({ onDrop }));

    const stopEvent = mockEvent();

    act(() => {
      result.current.handleDrop(stopEvent);
    });

    expect(result.current.isActive).toBe(false);
    expect(onDrop).toHaveBeenCalledWith(stopEvent);
  });

  it('모든 드래그 이벤트에서 preventDefault, stopPropagation이 호출되어야 한다.', () => {
    const stopEvent = mockEvent();
    const { result } = renderHook(() => useDrag({}));

    act(() => {
      result.current.handleDragOver(stopEvent);
    });

    expect(stopEvent.preventDefault).toHaveBeenCalled();
    expect(stopEvent.stopPropagation).toHaveBeenCalled();
  });
});
