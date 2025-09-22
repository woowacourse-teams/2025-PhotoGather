import type { MyInfo } from './api.type';

export type SpaceAccessType = 'PRIVATE' | 'PUBLIC';

export interface SpaceCreateInfo {
  name: string;
  validHours: number;
  openedAt: string;
  type?: string;
  inbox?: boolean;
}

export interface Agreements {
  agreedToService: boolean;
  agreedToPrivacy: boolean;
}

export interface SpaceFunnelInfo {
  name: string;
  date: string;
  time: string;
  accessType: SpaceAccessType;
  isImmediateOpen: boolean | null;
  isUsingInbox: boolean;
  agreements: Agreements | null;
}

export interface MySpace extends Space {
  host: MyInfo;
  guestCount: number;
  photoCount: number;
}

export interface Space {
  id: number;
  spaceCode: string;
  name: string;
  openedAt: string;
  expiredAt: string;
  isExpired: boolean;
  guestCount?: number;
  photoCount?: number;
  host: MyInfo;
  type: SpaceAccessType;
  // TODO: 서버에서 inbox 필드 추가되면 optional 제거 필요
  inbox?:
    | {
        status: true;
        count: number;
      }
    | {
        status: false;
        count: 0;
      };
}

export interface SpaceCapacity {
  maxCapacity: number;
  usedCapacity: number;
}

export type SpaceFilterType = 'all' | 'open' | 'closed' | 'upcoming';
