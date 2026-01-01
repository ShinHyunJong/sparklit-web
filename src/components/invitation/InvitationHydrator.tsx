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
  const atomsToHydrate = invitation
    ? (() => {
        const v = buildInvitationEditorInitialValues(invitation);

        return [
          // ✅ object/array류는 undefined 금지: 없으면 null/[]로
          [invitationEditorAtom.layoutOrderAtom, v.layoutOrder ?? []],

          // ✅ number류: 없으면 0 또는 기본 템플릿 번호
          [invitationEditorAtom.selectedTemplateNo, v.selectedTemplateNo ?? 0],

          // ✅ string류: 없으면 빈 문자열
          [invitationEditorAtom.selectedDate, v.selectedDate ?? ''],

          [invitationEditorAtom.greetingTitle, v.greetingTitle ?? ''],
          [invitationEditorAtom.greetingContent, v.greetingContent ?? ''],

          [invitationEditorAtom.selectedBgColor, v.selectedBgColor ?? ''],
          [invitationEditorAtom.selectedMainColor, v.selectedMainColor ?? ''],
          [invitationEditorAtom.selectedPointColor, v.selectedPointColor ?? ''],

          [invitationEditorAtom.brideFirstName, v.brideFirstName ?? ''],
          [invitationEditorAtom.groomFirstName, v.groomFirstName ?? ''],

          [invitationEditorAtom.dressCodeGentleman, v.dressCodeGentleman ?? ''],
          [invitationEditorAtom.dressCodeLady, v.dressCodeLady ?? ''],
          [invitationEditorAtom.dressCodeMainColor, v.dressCodeMainColor ?? ''],
          [invitationEditorAtom.dressCodeSubColor, v.dressCodeSubColor ?? ''],
          [
            invitationEditorAtom.dressCodeThirdColor,
            v.dressCodeThirdColor ?? '',
          ],

          [invitationEditorAtom.primarySponsor, v.primarySponsor ?? ''],
          [invitationEditorAtom.secondarySponsor, v.secondarySponsor ?? ''],
          [invitationEditorAtom.bestMan, v.bestMan ?? ''],
          [invitationEditorAtom.maidOfHonor, v.maidOfHonor ?? ''],
          [invitationEditorAtom.groomsMen, v.groomsMen ?? []],
          [invitationEditorAtom.bridesMaids, v.bridesMaids ?? []],

          [invitationEditorAtom.endingText, v.endingText ?? ''],
          [invitationEditorAtom.notice, v.notice ?? ''],
        ] as const;
      })()
    : ([] as const);

  useHydrateAtoms(atomsToHydrate);
  return null;
}
