// TODO: PR별 선언 위치 통합 필요
export type SpaceVisibility = 'PUBLIC' | 'PRIVATE';

export interface MySpace {
  id: number;
  spaceCode: string;
  title: string;
  thumbnail: string;
  guestCount: number;
  createdAt: string;
  isPublic: boolean;
}
