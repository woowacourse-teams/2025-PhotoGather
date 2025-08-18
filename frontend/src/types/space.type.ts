export interface SpaceCreateInfo {
  name: string;
  validHours: number;
  openedAt: string;
  password: string;
}

export interface SpaceFunnelInfo {
  name: string;
  date: string;
  time: string;
  isImmediateOpen: boolean | null;
  agreements: boolean[] | null;
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
