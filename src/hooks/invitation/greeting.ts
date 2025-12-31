import { useQueryClient } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { useSearchParams } from 'next/navigation';

import invitationEditorAtom from '@/atoms/invitationEditor';
import { saved } from '@/helpers/toaster.helper';

import { updateGreetingApi } from './api';

export function useUpdateGreeting() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const uid = searchParams.get('uid');
  const greetingTitleValue = useAtomValue(invitationEditorAtom.greetingTitle);
  const greetingContentValue = useAtomValue(
    invitationEditorAtom.greetingContent,
  );

  // const { mutate, isPending } = useMutation({
  //   mutationFn: () =>
  //     updateGreetingApi(uid!, greetingTitleValue, greetingContentValue),
  //   onSuccess: async () => {
  //     await queryClient.invalidateQueries({
  //       queryKey: ['invitationDetail', uid],
  //     });
  //   },
  // });

  const updateGreeting = async () => {
    if (!uid) return;
    saved(() =>
      updateGreetingApi(uid, greetingTitleValue, greetingContentValue),
    );
  };

  return { updateGreeting };
}
