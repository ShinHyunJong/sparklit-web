import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import { deletePhotoApi, postPhotoListApi, updatePhotoCropApi } from './api';

export function usePostInvitationPhoto() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const uid = searchParams.get('uid');

  const { mutate, isPending } = useMutation({
    mutationFn: (data: { invitationId: string; formData: FormData }) =>
      postPhotoListApi(data.invitationId, data.formData),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['invitationDetail', uid],
      });
    },
  });

  const postPhoto = async (formData: FormData) => {
    if (!uid) return;
    mutate({ invitationId: uid!, formData });
  };

  return { postPhoto, isPending };
}

export function useUpdatePhotoCrop() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const uid = searchParams.get('uid');

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({
      photoId,
      formData,
    }: {
      photoId: number;
      formData: FormData;
    }) => updatePhotoCropApi(photoId, formData),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['invitationDetail', uid],
      });
    },
  });

  const updatePhotoCrop = async (photoId: number, formData: FormData) => {
    await mutateAsync({ photoId, formData });
  };

  return { updatePhotoCrop, isPending };
}

export function useDeletePhoto() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const uid = searchParams.get('uid');

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (photoId: number) => deletePhotoApi(photoId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['invitationDetail', uid],
      });
    },
  });

  const deletePhoto = async (photoId: number) => {
    await mutateAsync(photoId);
  };

  return { deletePhoto, isPending };
}
