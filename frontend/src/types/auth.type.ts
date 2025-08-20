export interface KakaoLoginURL {
  loginUrl: string;
}

export interface KakaoClientId {
  clientId: string;
}

export interface KakaoTokenResponse {
  access_token: string;
  token_type: 'bearer';
  refresh_token: string;
  id_token: string;
  expires_in: number;
  scope: string;
  refresh_token_expires_in: string;
}

export interface AuthTokenResponse {
  accessToken: string;
  refreshToken: string;
}
