import type {
  CreateWorkRequest,
  UpdateWorkRequest,
  WorkDetail,
  WorkListResponse,
} from '../../../types/domain/work.type';
import { http } from '../../http';

const API_VERSION_V2_HEADERS = { 'X-API-Version': '2' };
const API_VERSION_V3_HEADERS = { 'X-API-Version': '3' };
const API_VERSION_V1_HEADERS = { 'X-API-Version': '1' };

export const workService = {
  getWorks: (spaceCode: string) =>
    http.get<WorkListResponse>(`/spaces/${spaceCode}/products`, {
      headers: API_VERSION_V3_HEADERS,
    }),

  getWork: (spaceCode: string, workId: string) =>
    http.get<WorkDetail>(`/spaces/${spaceCode}/products/${workId}`, {
      headers: API_VERSION_V1_HEADERS,
    }),

  deleteWork: (spaceCode: string, workId: string) =>
    http.delete<WorkDetail>(`/spaces/${spaceCode}/products/${workId}`, {
      headers: API_VERSION_V1_HEADERS,
    }),

  createWork: (spaceCode: string, data: CreateWorkRequest) => {
    return http.post<WorkDetail>(`/spaces/${spaceCode}/products`, {
      body: data,
      headers: API_VERSION_V3_HEADERS,
    });
  },

  updateWork: (spaceCode: string, workId: string, data: UpdateWorkRequest) => {
    return http.patch<WorkDetail>(`/spaces/${spaceCode}/products/${workId}`, {
      body: data,
      headers: API_VERSION_V1_HEADERS,
    });
  },
};
