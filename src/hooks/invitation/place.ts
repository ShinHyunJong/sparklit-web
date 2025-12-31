import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import type { Invitation, InvitationPhoto } from '@/types/model';

import {
  deletePlaceTimeApi,
  postPlaceApi,
  postPlaceTimeApi,
} from '../place/api';
import { deleteInvitationPlaceApi } from './api';

export function usePostInvitationPlace() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const uid = searchParams.get('uid');
  const { mutate, isPending } = useMutation({
    mutationFn: (data: {
      googlePlaceId: string;
      name: string;
      address: string;
      lat: number;
      lng: number;
    }) =>
      postPlaceApi(
        uid!.toString(),
        data.googlePlaceId,
        data.name,
        data.address,
        data.lat,
        data.lng,
      ),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['invitationDetail', uid],
      });
    },
  });

  const postPlace = async (
    googlePlaceId: string,
    name: string,
    address: string,
    lat: number,
    lng: number,
  ) => {
    if (!uid) return;
    const data = {
      googlePlaceId,
      name,
      address,
      lat,
      lng,
    };
    mutate(data);
  };

  return { postPlace, isPending };
}

export function useUpdatePhotoClient() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const uid = searchParams.get('uid');

  const updatePhotoClient = async (newList: InvitationPhoto[]) => {
    queryClient.setQueryData<{ invitationDetail: Invitation }>(
      ['invitationDetail', uid],
      (oldData) => {
        console.log(oldData);
        if (!oldData) return oldData;
        console.log(newList);
        const newData = {
          ...oldData,
          photoList: newList,
        };
        console.log(newData);
        return newData;
      },
    );
  };

  return { updatePhotoClient };
}

export function usePostInvitationPlaceTime() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const uid = searchParams.get('uid');

  const { mutate, isPending } = useMutation({
    mutationFn: (invitationPlaceId: number) =>
      postPlaceTimeApi(invitationPlaceId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['invitationDetail', uid],
      });
    },
  });

  const postTime = async (invitationPlaceId: number) => {
    mutate(invitationPlaceId);
  };

  return { postTime, isPending };
}

export function useDeleteInvitationPlace() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const uid = searchParams.get('uid');
  const { mutate, isPending } = useMutation({
    mutationFn: (invitationPlaceId: number) =>
      deleteInvitationPlaceApi(invitationPlaceId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['invitationDetail', uid],
      });
    },
  });

  const deleteInvitationPlace = async (invitationPlaceId: number) => {
    mutate(invitationPlaceId);
  };

  return { deleteInvitationPlace, isPending };
}

export function useDeleteInvitationPlaceTime() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const uid = searchParams.get('uid');
  const { mutate, isPending } = useMutation({
    mutationFn: (timeId: number) => deletePlaceTimeApi(timeId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['invitationDetail', uid],
      });
    },
  });

  const deletePlaceTime = async (timeId: number) => {
    mutate(timeId);
  };

  return { deletePlaceTime, isPending };
}
