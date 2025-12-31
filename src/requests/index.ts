import type {
  AxiosInterceptorManager,
  InternalAxiosRequestConfig,
} from 'axios';
import axios from 'axios';

import { API_ENDPOINT } from '@/configs/request.config';

export const api = axios.create({
  baseURL: API_ENDPOINT,
});

// 쿠키에서 name에 해당하는 값을 가져오는 유틸
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

const { interceptors } = api;
const requestInterceptor: AxiosInterceptorManager<InternalAxiosRequestConfig> =
  interceptors.request;

requestInterceptor.use(
  (config) => {
    // 기존 storage 대신 쿠키에서 읽기
    const token = getCookie('token');

    // AxiosHeaders 인스턴스일 때와 일반 객체일 때 모두 대응
    if (token) {
      if (typeof config.headers?.set === 'function') {
        config.headers.set('Authorization', `Bearer ${token}`);
      } else {
        // plain object일 경우 직접 할당
        if (config.headers) {
          (config.headers as any).Authorization = `Bearer ${token}`;
        }
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);
