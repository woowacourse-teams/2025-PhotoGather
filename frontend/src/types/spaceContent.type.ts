export interface SpaceContent {
  id: number;
  contentType: string;
  spaceId: number;
}

export interface CreateSpaceContentInput {
  contentType: string;
  spaceId: number;
}
