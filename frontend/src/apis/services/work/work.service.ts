import type {
  CreateWorkRequest,
  UpdateWorkRequest,
  WorkDetail,
  WorkListResponse,
} from '../../../types/domain/work.type';
import { http } from '../../http';

const API_VERSION_V2_HEADERS = { 'X-API-Version': '2' };
const API_VERSION_V3_HEADERS = { 'X-API-Version': '3' };

export const workService = {
  getWorks: (spaceCode: string) =>
    http.get<WorkListResponse>(`/spaces/${spaceCode}/products`, {
      headers: API_VERSION_V3_HEADERS,
    }),

  getWork: (spaceCode: string) =>
    http.get<WorkDetail>(`/spaces/${spaceCode}/products`, {
      headers: API_VERSION_V2_HEADERS,
    }),

  deleteWork: (spaceCode: string) =>
    http.delete<WorkDetail>(`/spaces/${spaceCode}/products`),

  createWork: (spaceCode: string, data: CreateWorkRequest) => {
    return http.post(`/spaces/${spaceCode}/products`, {
      body: data,
      headers: API_VERSION_V2_HEADERS,
    });
  },

  updateWork: (spaceCode: string, data: UpdateWorkRequest) => {
    return http.patch(`/spaces/${spaceCode}/products`, {
      body: data,
      headers: API_VERSION_V2_HEADERS,
    });
  },
};
