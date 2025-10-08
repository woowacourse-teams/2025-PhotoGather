export interface SpacePhoto {
  isExists: boolean;
  path: string;
}

export interface SpaceInfo {
  id: number;
  spaceCode: string;
  name: string;
  description: string;
  isPublic: boolean;
  instagramUsername: string;
  email: string;
  spacePhoto: SpacePhoto;
}
