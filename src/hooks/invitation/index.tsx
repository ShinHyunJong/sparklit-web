import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useAtom } from 'jotai';
import { useParams, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';

import invitationEditorAtom from '@/atoms/invitationEditor';
import type { Invitation } from '@/types/model';

import {
  getInvitationDetailApi,
  getInvitationListApi,
  updateInvitationApi,
} from './api';

export type InvitationEditorFormValues = {
  date?: string;
  brideLastName: string;
  brideFirstName: string;
  brideMiddleName: string;
  brideMomName: string;
  brideDadName: string;
  groomLastName: string;
  groomFirstName: string;
  groomMiddleName: string;
  groomMomName: string;
  groomDadName: string;
};

export function useInvitationList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['invitationList'],
    queryFn: getInvitationListApi,
  });

  return {
    invitationList: data || [],
    isLoading,
    error,
  };
}

export function useInvitationDetailSSR(initialData: Invitation) {
  const { invitaionUid } = useParams();
  const { data } = useQuery({
    queryKey: ['invitationDetail', invitaionUid],
    queryFn: () => getInvitationDetailApi(invitaionUid!.toString()),
    initialData,
    enabled: !!invitaionUid,
  });
  return {
    invitationDetail: data || null,
  };
}

export function useInvitationDetail(initialData?: Invitation) {
  const searchParams = useSearchParams();
  const uid = searchParams.get('uid');
  const { invitaionUid } = useParams();

  const uidToUse = uid || invitaionUid;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['invitationDetail', uidToUse],
    queryFn: () => getInvitationDetailApi(uidToUse!.toString()),
    enabled: !!uidToUse,
    initialData: initialData,
  });

  return {
    invitationDetail: data || null,
    isLoading,
    refetch,
    error,
  };
}

export function useInvitationEditorForm() {
  const { control, formState, setValue, getValues } =
    useForm<InvitationEditorFormValues>({
      defaultValues: {
        brideLastName: '',
        brideFirstName: '',
        brideMiddleName: '',
        brideMomName: '',
        brideDadName: '',
        groomLastName: '',
        groomFirstName: '',
        groomMiddleName: '',
        groomMomName: '',
        groomDadName: '',
      },
      mode: 'onChange',
      reValidateMode: 'onChange',
    });

  return {
    control,
    formState,
    setValue,
    getValues,
  };
}

export function useSaveInvitation() {
  const searchParams = useSearchParams();
  const uid = searchParams.get('uid');
  const [selectedDate, setSelectedDate] = useAtom(
    invitationEditorAtom.selectedDate,
  );

  const [brideLastName, setBrideLastName] = useAtom(
    invitationEditorAtom.brideLastName,
  );
  const [brideFirstName, setBrideFirstName] = useAtom(
    invitationEditorAtom.brideFirstName,
  );
  const [brideMiddleName, setBrideMiddleName] = useAtom(
    invitationEditorAtom.brideMiddleName,
  );
  const [brideMomName, setBrideMomName] = useAtom(
    invitationEditorAtom.brideMomName,
  );
  const [brideDadName, setBrideDadName] = useAtom(
    invitationEditorAtom.brideDadName,
  );
  const [groomLastName, setGroomLastName] = useAtom(
    invitationEditorAtom.groomLastName,
  );
  const [groomFirstName, setGroomFirstName] = useAtom(
    invitationEditorAtom.groomFirstName,
  );
  const [groomMiddleName, setGroomMiddleName] = useAtom(
    invitationEditorAtom.groomMiddleName,
  );
  const [groomMomName, setGroomMomName] = useAtom(
    invitationEditorAtom.groomMomName,
  );
  const [groomDadName, setGroomDadName] = useAtom(
    invitationEditorAtom.groomDadName,
  );

  const onClickSave = async (newDate?: Date) => {
    if (!uid || !selectedDate) return;
    const date = dayjs(newDate || selectedDate).format('YYYY-MM-DD HH:mm:ss');
    const body = {
      date,
      brideLastName,
      brideFirstName,
      brideMiddleName,
      brideMomName,
      brideDadName,
      groomLastName,
      groomFirstName,
      groomMiddleName,
      groomMomName,
      groomDadName,
    };
    await updateInvitationApi(uid, body);
  };
  return {
    onClickSave,
  };
}
