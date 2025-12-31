import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useAtomValue } from 'jotai';
import { useSearchParams } from 'next/navigation';

import invitationEditorAtom from '@/atoms/invitationEditor';

import { updatePlaceTimeApi } from '../invitation/api';

export function useUpdateHourMinutePlaceTime() {
  const selectedDate = useAtomValue(invitationEditorAtom.selectedDate);
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
    const updatedDate = date
      .hour(
        h === '12'
          ? ampm === 'AM'
            ? 0
            : 12
          : ampm === 'AM'
            ? parseInt(h)
            : parseInt(h) + 12,
      )
      .minute(m ? parseInt(m) : 0);

    mutate({
      timeId,
      h: updatedDate.hour(),
      m: updatedDate.minute(),
      ampm,
      name,
      description,
    });
  };

  return { updatePlaceTime };
}
