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
          [invitationEditorAtom.layoutOrderAtom, v.layoutOrder ?? undefined],
          [
            invitationEditorAtom.selectedTemplateNo,
            v.selectedTemplateNo ?? undefined,
          ],
          [invitationEditorAtom.selectedDate, v.selectedDate ?? undefined],

          [invitationEditorAtom.greetingTitle, v.greetingTitle ?? undefined],
          [
            invitationEditorAtom.greetingContent,
            v.greetingContent ?? undefined,
          ],

          [
            invitationEditorAtom.selectedBgColor,
            v.selectedBgColor ?? undefined,
          ],
          [
            invitationEditorAtom.selectedMainColor,
            v.selectedMainColor ?? undefined,
          ],
          [
            invitationEditorAtom.selectedPointColor,
            v.selectedPointColor ?? undefined,
          ],

          [invitationEditorAtom.brideFirstName, v.brideFirstName ?? undefined],
          [invitationEditorAtom.groomFirstName, v.groomFirstName ?? undefined],

          [
            invitationEditorAtom.dressCodeGentleman,
            v.dressCodeGentleman ?? undefined,
          ],
          [invitationEditorAtom.dressCodeLady, v.dressCodeLady ?? undefined],
          [
            invitationEditorAtom.dressCodeMainColor,
            v.dressCodeMainColor ?? undefined,
          ],
          [
            invitationEditorAtom.dressCodeSubColor,
            v.dressCodeSubColor ?? undefined,
          ],
          [
            invitationEditorAtom.dressCodeThirdColor,
            v.dressCodeThirdColor ?? undefined,
          ],

          [invitationEditorAtom.primarySponsor, v.primarySponsor ?? undefined],
          [
            invitationEditorAtom.secondarySponsor,
            v.secondarySponsor ?? undefined,
          ],
          [invitationEditorAtom.bestMan, v.bestMan ?? undefined],
          [invitationEditorAtom.maidOfHonor, v.maidOfHonor ?? undefined],
          [invitationEditorAtom.groomsMen, v.groomsMen ?? undefined],
          [invitationEditorAtom.bridesMaids, v.bridesMaids ?? undefined],

          [invitationEditorAtom.endingText, v.endingText ?? undefined],
          [invitationEditorAtom.notice, v.notice ?? undefined],
        ] as const;
      })()
    : ([] as const);

  // ✅ 항상 호출
  useHydrateAtoms(atomsToHydrate);

  return null;
}
