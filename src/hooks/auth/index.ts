import { useQuery, useQueryClient } from '@tanstack/react-query';

import type { User } from '@/types/model';

import { getMeApi } from './api';

export function useAuth() {
  const { data, isLoading } = useQuery({
    queryKey: ['auth'],
    queryFn: getMeApi,
  });

  return {
    user: data ?? null,
    isLoading,
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
