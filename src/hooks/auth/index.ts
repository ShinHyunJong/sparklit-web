import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import type { User } from '@/types/model';

import { getMeApi } from './api';

export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ['auth'],
    queryFn: getMeApi,
  });

  const logout = () => {
    localStorage.clear();
    document.cookie.split(';').forEach((cookie) => {
      const name = cookie.split('=')[0]?.trim();
      if (!name) return;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    });
    queryClient.clear();
    router.replace('/auth/login');
  };

  return {
    user: data ?? null,
    isLoading,
    logout,
  };
}

export function useUpdateUser() {
  const client = useQueryClient();
  const setInitialUser = (user: User) => {
    client.setQueryData(['auth'], (old) => {
      if (old) {
        return {
          ...old,
          user: user,
        };
      }
      return user;
    });
  };
  return {
    setInitialUser,
  };
}
