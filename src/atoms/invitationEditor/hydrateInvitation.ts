// atoms/invitationEditor/hydrateInvitation.ts
import { parseColor } from '@chakra-ui/react';

import day from '@/helpers/date.helper';
import type { Invitation } from '@/types/model';

export function buildInvitationEditorInitialValues(invitation: Invitation) {
  // layoutOrder: JSON string -> parsed
  const layoutOrder = invitation.layoutOrder
    ? JSON.parse(invitation.layoutOrder)
    : null;

  // date: string -> 'MM/DD/YYYY'
  const selectedDate = invitation.date
    ? day(invitation.date).format('MM/DD/YYYY')
    : null;

  // colors: string -> parsed color (너가 쓰던 방식 유지)
  const mainTextColor = invitation.mainTextColor
    ? parseColor(invitation.mainTextColor)
    : null;

  const dressCodeMainColor = invitation.dressCodeMainColor
    ? parseColor(invitation.dressCodeMainColor)
    : null;

  const dressCodeSubColor = invitation.dressCodeSubColor
    ? parseColor(invitation.dressCodeSubColor)
    : null;

  const dressCodeThirdColor = invitation.dressCodeThirdColor
    ? parseColor(invitation.dressCodeThirdColor)
    : null;

  return {
    layoutOrder,
    selectedTemplateNo: invitation.templateNo ?? null,
    selectedDate,
    greetingTitle: invitation.greetingTitle ?? null,
    greetingContent: invitation.greetingContent ?? null,
    selectedBgColor: invitation.bgColor ?? null,
    selectedMainColor: mainTextColor, // 네 atom 이름이 selectedMainColor면 여기에 매핑
    selectedPointColor: invitation.pointColor ?? null,

    brideFirstName: invitation.brideFirstName ?? null,
    groomFirstName: invitation.groomFirstName ?? null,

    dressCodeGentleman: invitation.dressCodeGentleman ?? null,
    dressCodeLady: invitation.dressCodeLady ?? null,
    dressCodeMainColor,
    dressCodeSubColor: dressCodeSubColor,
    dressCodeThirdColor,

    primarySponsor: invitation.primarySponsor ?? null,
    secondarySponsor: invitation.secondarySponsor ?? null,

    bestMan: invitation.bestMan ?? null,
    maidOfHonor: invitation.maidOfHonor ?? null,
    groomsMen: invitation.groomsMen ?? null,
    bridesMaids: invitation.bridesMaids ?? null,
    selectedFontFamily: invitation.baseFont ?? 'montserrat',
    wishlistUrl: invitation.wishlistUrl ?? '',
    bankAccount: invitation.bankAccount ?? '',

    endingText:
      invitation.endingText ??
      '<p>The best thing to hold onto in life is each other.</p><br/><p>– Audrey Hepburn</p>',
    notice: invitation.notice ?? null,
    wishlistText: invitation.wishlistText ?? '',
  };
}
