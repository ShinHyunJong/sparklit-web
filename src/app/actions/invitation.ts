'use server';

import { revalidatePath } from 'next/cache';

export async function revalidateInvitationDetail(invitationUid: string) {
  if (!invitationUid) return;
  revalidatePath(`/invitation/${invitationUid}`);
}
