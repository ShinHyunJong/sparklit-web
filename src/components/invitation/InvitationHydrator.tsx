// components/invitation/InvitationEditorHydrator.tsx
'use client';

import { useHydrateAtoms } from 'jotai/utils';

import invitationEditorAtom from '@/atoms/invitationEditor';
import { buildInvitationEditorInitialValues } from '@/atoms/invitationEditor/hydrateInvitation';
import type { Invitation } from '@/types/model';

export default function InvitationEditorHydrator({
  invitation,
}: {
  invitation: Invitation | null | undefined;
}) {
  if (!invitation) return null;

  const v = buildInvitationEditorInitialValues(invitation);

  useHydrateAtoms([
    // layout / template / date
    [invitationEditorAtom.layoutOrderAtom, v.layoutOrder ?? undefined],
    [
      invitationEditorAtom.selectedTemplateNo,
      v.selectedTemplateNo ?? undefined,
    ],
    [invitationEditorAtom.selectedDate, v.selectedDate ?? undefined],

    // greeting
    [invitationEditorAtom.greetingTitle, v.greetingTitle ?? undefined],
    [invitationEditorAtom.greetingContent, v.greetingContent ?? undefined],

    // colors
    [invitationEditorAtom.selectedBgColor, v.selectedBgColor ?? undefined],
    [invitationEditorAtom.selectedMainColor, v.selectedMainColor ?? undefined],
    [
      invitationEditorAtom.selectedPointColor,
      v.selectedPointColor ?? undefined,
    ],

    // names
    [invitationEditorAtom.brideFirstName, v.brideFirstName ?? undefined],
    [invitationEditorAtom.groomFirstName, v.groomFirstName ?? undefined],

    // dress code
    [
      invitationEditorAtom.dressCodeGentleman,
      v.dressCodeGentleman ?? undefined,
    ],
    [invitationEditorAtom.dressCodeLady, v.dressCodeLady ?? undefined],
    [
      invitationEditorAtom.dressCodeMainColor,
      v.dressCodeMainColor ?? undefined,
    ],
    [invitationEditorAtom.dressCodeSubColor, v.dressCodeSubColor ?? undefined],
    [
      invitationEditorAtom.dressCodeThirdColor,
      v.dressCodeThirdColor ?? undefined,
    ],

    // roles
    [invitationEditorAtom.primarySponsor, v.primarySponsor ?? undefined],
    [invitationEditorAtom.secondarySponsor, v.secondarySponsor ?? undefined],
    [invitationEditorAtom.bestMan, v.bestMan ?? undefined],
    [invitationEditorAtom.maidOfHonor, v.maidOfHonor ?? undefined],
    [invitationEditorAtom.groomsMen, v.groomsMen ?? undefined],
    [invitationEditorAtom.bridesMaids, v.bridesMaids ?? undefined],

    // misc
    [invitationEditorAtom.endingText, v.endingText ?? undefined],
    [invitationEditorAtom.notice, v.notice ?? undefined],
  ]);

  return null;
}
