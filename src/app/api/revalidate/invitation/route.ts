'use server';

import { NextResponse } from 'next/server';

import { revalidateInvitationDetail } from '@/app/actions/invitation';

export async function POST(req: Request) {
  try {
    const { invitationUid } = await req.json();
    await revalidateInvitationDetail(invitationUid);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
