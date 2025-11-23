import type {
  CreateWorkRequest,
  UpdateWorkRequest,
  WorkDetail,
  WorkListResponse,
} from '../../../types/domain/work.type';
import { http } from '../../http';

export const API_VERSION = {
  V1: { 'X-API-Version': '1' },
  V2: { 'X-API-Version': '2' },
  V3: { 'X-API-Version': '3' },
} as const;

export const workService = {
  getWorks: (spaceCode: string) =>
    http.get<WorkListResponse>(`/spaces/${spaceCode}/products`, {
      headers: API_VERSION.V3,
    }),

  getWork: (spaceCode: string, workId: string) =>
    http.get<WorkDetail>(`/spaces/${spaceCode}/products/${workId}`, {
      headers: API_VERSION.V1,
    }),

  deleteWork: (spaceCode: string, workId: string) =>
    http.delete<WorkDetail>(`/spaces/${spaceCode}/products/${workId}`, {
      headers: API_VERSION.V1,
    }),

  createWork: (spaceCode: string, data: CreateWorkRequest) => {
    return http.post<WorkDetail>(`/spaces/${spaceCode}/products`, {
      body: data,
      headers: API_VERSION.V3,
    });
  },

  updateWork: (spaceCode: string, workId: string, data: UpdateWorkRequest) => {
    return http.patch<WorkDetail>(`/spaces/${spaceCode}/products/${workId}`, {
      body: data,
      headers: API_VERSION.V1,
    });
  },
};
