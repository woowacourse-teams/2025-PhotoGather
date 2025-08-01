import { renderHook } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { NETWORK } from '../src/constants/errors';
import { ROUTES } from '../src/constants/routes';
import useApiCall from '../src/hooks/@common/useApiCall';
import type { ApiResponse } from '../src/types/api.type';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('useApiCall 훅 테스트', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it('성공 응답을 그대로 반환해야 함', async () => {
    const { result } = renderHook(() => useApiCall());
    const mockResponse: ApiResponse<string> = {
      success: true,
      data: 'test data',
    };
    const mockApiCall = jest.fn().mockResolvedValue(mockResponse);

    const response = await result.current.execute(mockApiCall);

    expect(response).toEqual(mockResponse);
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('네트워크 에러 시 에러 페이지로 이동해야 함', async () => {
    const { result } = renderHook(() => useApiCall());
    const mockResponse: ApiResponse<string> = {
      success: false,
      error: NETWORK.DEFAULT,
    };
    const mockApiCall = jest.fn().mockResolvedValue(mockResponse);

    const response = await result.current.execute(mockApiCall);

    expect(response).toEqual(mockResponse);
    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.ERROR.NETWORK);
  });

  it('일반 API 에러는 라우팅하지 않아야 함', async () => {
    const { result } = renderHook(() => useApiCall());
    const mockResponse: ApiResponse<string> = {
      success: false,
      error: 'Invalid request',
    };
    const mockApiCall = jest.fn().mockResolvedValue(mockResponse);

    const response = await result.current.execute(mockApiCall);

    expect(response).toEqual(mockResponse);
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('예외 발생 시 에러 페이지로 이동하고 에러를 다시 throw해야 함', async () => {
    const { result } = renderHook(() => useApiCall());
    const mockError = new Error('Unexpected error');
    const mockApiCall = jest.fn().mockRejectedValue(mockError);

    await expect(result.current.execute(mockApiCall)).rejects.toThrow(
      mockError,
    );
    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.ERROR.NETWORK);
  });

  it('대소문자 구분 없이 네트워크 에러를 감지해야 함', async () => {
    const { result } = renderHook(() => useApiCall());
    const mockResponse: ApiResponse<string> = {
      success: false,
      error: 'NETWORK ERROR',
    };
    const mockApiCall = jest.fn().mockResolvedValue(mockResponse);

    await result.current.execute(mockApiCall);

    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.ERROR.NETWORK);
  });
});
