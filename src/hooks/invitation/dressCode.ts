import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import { updateDressCodeApi, updateDressCodeColorApi } from './api';

export function useUpdateDressCode() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const uid = searchParams.get('uid');

  const { mutate, isPending } = useMutation({
    mutationFn: ({ gentleman, lady }: { gentleman: string; lady: string }) =>
      updateDressCodeApi(uid!, gentleman, lady),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['invitationDetail', uid],
      });
    },
  });

  const updateDressCode = async (gentleman: string, lady: string) => {
    if (!uid) return;
    mutate({ gentleman, lady });
  };

  return { updateDressCode };
}

export function useUpdateDressCodeColor() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const uid = searchParams.get('uid');

  const { mutate, isPending } = useMutation({
    mutationFn: ({
      mainColor,
      subColor,
      thirdColor,
    }: {
      mainColor: string;
      subColor: string;
      thirdColor: string;
    }) => updateDressCodeColorApi(uid!, mainColor, subColor, thirdColor),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['invitationDetail', uid],
      });
    },
  });

  const updateDressCodeColor = (
    mainColor: string,
    subColor: string,
    thirdColor: string,
  ) => {
    if (!uid) return;
    mutate({ mainColor, subColor, thirdColor });
  };

  return { updateDressCodeColor };
}
