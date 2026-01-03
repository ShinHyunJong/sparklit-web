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
