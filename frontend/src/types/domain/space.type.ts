export interface MySpace {
  id: number;
  spaceCode: string;
  name: string;
  description: string;
  isPublic: boolean;
  instagramUsername: string;
  email: string;
  spacePhoto: SpacePhoto;
  guestBookCardCount: number;
}

export interface SpacePhoto {
  isExists: boolean;
  path: string;
}

export interface SpaceInfo extends SpaceInfoFormData {
  id: number;
  spaceCode: string;
  spacePhoto: SpacePhoto;
}

export interface SpaceInfoFormData {
  name: string;
  description: string;
  isPublic: boolean;
  email: string;
  instagramUsername: string;
  isDeletePhoto?: boolean;
}

export interface SpaceStats {
  spaceStats: {
    spaceCount: number;
  };
  guestBookStats: {
    cardCount: number;
  };
}
