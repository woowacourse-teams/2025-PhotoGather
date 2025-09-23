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
  type?: SpaceAccessType;
}

export interface UpdateSpaceInput {
  spaceCode?: string;
  name?: string;
  openedAt?: Date | string;
  expiredAt?: Date | string;
}

export interface SpaceCapacity {
  maxCapacity: number;
  usedCapacity: number;
}

export type SpaceFilterType = 'all' | 'open' | 'closed' | 'upcoming';
