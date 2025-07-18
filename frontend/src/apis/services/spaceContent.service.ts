import type {
  CreateSpaceContentInput,
  SpaceContent,
} from '../../types/spaceContent.type';
import { http } from '../http';

export const spaceContentService = {
  create: (data: CreateSpaceContentInput) =>
    http.post<SpaceContent>('/space-contents', data),

  getBySpaceId: (spaceId: number) =>
    http.get<SpaceContent[]>(`/spaces/${spaceId}/contents`),

  delete: (id: number) => http.delete<void>(`/space-contents/${id}`),
};
