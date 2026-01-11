import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useSearchParams } from 'next/navigation';

import { updatePlaceTimeApi } from '../invitation/api';
import { selectedDate } from '@/atoms/invitationEditor/atom';

export function useUpdateHourMinutePlaceTime() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const uid = searchParams.get('uid');
  const date = dayjs(selectedDate);
  const { mutate, isPending } = useMutation({
    mutationFn: (data: {
      timeId: number;
      h: number;
      m: number;
      ampm: string;
      name: string;
      description?: string | null;
    }) =>
      updatePlaceTimeApi(data.timeId, {
        hour: data.h,
        minute: data.m,
        ampm: data.ampm,
        name: data.name,
        description: data.description || null,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['invitationDetail', uid],
      });
    },
  });

  const updatePlaceTime = async (
    timeId: number,
    h: string,
    m: string,
    ampm: string,
    name: string,
    description?: string | null,
  ) => {
    mutate({
      timeId,
      h: parseInt(h, 10),
      m: parseInt(m, 10),
      ampm,
      name,
      description,
    });
  };

  return { updatePlaceTime };
}
