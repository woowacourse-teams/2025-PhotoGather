export interface SpaceCreateInfo {
  name: string;
  validHours: number;
  openedAt: string;
  password: string;
}

export interface Agreements {
  agreedToService: boolean;
  agreedToPrivacy: boolean;
}

export interface SpaceFunnelInfo {
  name: string;
  date: string;
  time: string;
  isImmediateOpen: boolean | null;
  agreements: Agreements | null;
}

export interface Space {
  id: number;
  spaceCode: string;
  name: string;
  openedAt: string;
  expiredAt: string;
  isExpired: boolean;
}

export interface UpdateSpaceInput {
  spaceCode?: string;
  name?: string;
  openedAt?: Date | string;
  expiredAt?: Date | string;
}
