import type {
  CreateWorkRequest,
  UpdateWorkRequest,
  WorkDetail,
} from '../../../types/domain/work.type';
import { http } from '../../http';

const API_VERSION_HEADERS = { 'X-API-Version': '2' };

export const workService = {
  getWork: (spaceCode: string) =>
    http.get<WorkDetail>(`/spaces/${spaceCode}/products`, {
      headers: API_VERSION_HEADERS,
    }),

  deleteWork: (spaceCode: string) =>
    http.delete<WorkDetail>(`/spaces/${spaceCode}/products`),

  createWork: (spaceCode: string, data: CreateWorkRequest) => {
    return http.post(`/spaces/${spaceCode}/products`, {
      body: data,
      headers: API_VERSION_HEADERS,
    });
  },

  updateWork: (spaceCode: string, data: UpdateWorkRequest) => {
    return http.patch(`/spaces/${spaceCode}/products`, {
      body: data,
      headers: API_VERSION_HEADERS,
    });
  },
};
