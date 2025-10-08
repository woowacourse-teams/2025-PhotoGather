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
}
