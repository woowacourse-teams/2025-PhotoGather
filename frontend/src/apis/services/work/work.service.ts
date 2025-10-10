import type {
  CreateWorkRequest,
  UpdateWorkRequest,
  WorkDetail,
} from '../../../types/domain/work.type';
import { http } from '../../http';

export const workService = {
  getWork: (spaceCode: string) =>
    http.get<WorkDetail>(`/spaces/${spaceCode}/products`),

  deleteWork: (spaceCode: string) =>
    http.delete<WorkDetail>(`/spaces/${spaceCode}/products`),

  createWork: (spaceCode: string, data: CreateWorkRequest) => {
    return http.post(`/spaces/${spaceCode}/products`, {
      title: data.title,
      category: data.category,
      authorName: data.authorName,
      description: data.description,
      photos: data.photos,
    });
  },

  updateWork: (spaceCode: string, data: UpdateWorkRequest) => {
    return http.patch(`/spaces/${spaceCode}/products`, {
      title: data.title,
      category: data.category,
      authorName: data.authorName,
      description: data.description,
      deletePhotoIds: data.deletePhotoIds,
      newPhotos: data.newPhotos,
    });
  },
};
