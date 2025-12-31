import { api } from '@/requests';
import type { User } from '@/types/model';

export async function getMeApi() {
  const { data } = await api.get('/auth/me');
  return data;
}

export async function loginApi(
  email: string,
  password: string,
): Promise<{ user: User; tokens: { accessToken: string } }> {
  const { data } = await api.post('/auth/login', {
    email,
    password,
  });
  return data;
}

export async function registerApi(
  email: string,
  password: string,
): Promise<{ user: User; tokens: { accessToken: string } }> {
  const { data } = await api.post('/auth/register', {
    email,
    password,
  });
  return data;
}

export async function checkEmailApi(email: string) {
  const { data } = await api.post('/auth/check/email', {
    email,
  });
  return data.exists;
}
