export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// TODO: 페이지네이션 응답 타입 추가
// 저장하면 자동으로 type 되는데 interface로 수정하기
export type PhotoListResponse<T> = {};
