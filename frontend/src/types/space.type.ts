export interface SpaceCreateInfo {
  name: string;
  openedAt: string;
  password: string;
}

export interface SpaceFunnelInfo {
  name: string;
  date: string;
  time: string;
}

export interface Space {
  id: number;
  spaceCode: string;
  name: string;
  openedAt: Date | string;
  expiredAt: Date | string;
  isExpired: boolean;
}

export interface UpdateSpaceInput {
  spaceCode?: string;
  name?: string;
  openedAt?: Date | string;
  expiredAt?: Date | string;
}
