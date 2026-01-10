import { parseColor } from '@chakra-ui/react';
import { useAtom, useSetAtom } from 'jotai';
import { useEffect } from 'react';

import invitationEditorAtom from '@/atoms/invitationEditor';
import day from '@/helpers/date.helper';
import type { Invitation } from '@/types/model';

export function useSetInvitation(invitation: Invitation | null | undefined) {
  const [selectedDate, setSelectedDate] = useAtom(
    invitationEditorAtom.selectedDate,
  );
  const [selectedTemplateNo, setSelectedTemplateNo] = useAtom(
    invitationEditorAtom.selectedTemplateNo,
  );
  const [mainTextColor, setMainTextColor] = useAtom(
    invitationEditorAtom.selectedMainColor,
  );
  const [layoutOrder, setLayoutOrder] = useAtom(
    invitationEditorAtom.layoutOrderAtom,
  );
  const [greetingTitle, setGreetingTitle] = useAtom(
    invitationEditorAtom.greetingTitle,
  );
  const [greetingContent, setGreetingContent] = useAtom(
    invitationEditorAtom.greetingContent,
  );
  const [selectedPointColor, setSelectedPointColor] = useAtom(
    invitationEditorAtom.selectedPointColor,
  );
  const [brideFirstName, setBrideFirstName] = useAtom(
    invitationEditorAtom.brideFirstName,
  );
  const [groomFirstName, setGroomFirstName] = useAtom(
    invitationEditorAtom.groomFirstName,
  );
  const [dressCodeGentleman, setDressCodeGentleman] = useAtom(
    invitationEditorAtom.dressCodeGentleman,
  );
  const [dressCodeLady, setDressCodeLady] = useAtom(
    invitationEditorAtom.dressCodeLady,
  );
  const [primarySponsor, setPrimarySponsor] = useAtom(
    invitationEditorAtom.primarySponsor,
  );
  const [secondarySponsor, setSecondarySponsor] = useAtom(
    invitationEditorAtom.secondarySponsor,
  );
  const [bestMan, setBestMan] = useAtom(invitationEditorAtom.bestMan);
  const [maidOfHonor, setMaidOfHonor] = useAtom(
    invitationEditorAtom.maidOfHonor,
  );
  const [groomsMen, setGroomsMen] = useAtom(invitationEditorAtom.groomsMen);
  const [bridesMaids, setBridesMaids] = useAtom(
    invitationEditorAtom.bridesMaids,
  );
  const [bgColor, setBgColor] = useAtom(invitationEditorAtom.selectedBgColor);
  const [mainColor, setMainColor] = useAtom(
    invitationEditorAtom.selectedMainColor,
  );
  const [dressCodeMainColor, setDressCodeMainColor] = useAtom(
    invitationEditorAtom.dressCodeMainColor,
  );
  const [dressCodeSecondaryColor, setDressCodeSecondaryColor] = useAtom(
    invitationEditorAtom.dressCodeSubColor,
  );
  const [dressCodeThirdColor, setDressCodeThirdColor] = useAtom(
    invitationEditorAtom.dressCodeThirdColor,
  );
  const [endingText, setEndingText] = useAtom(invitationEditorAtom.endingText);
  const [notice, setNotice] = useAtom(invitationEditorAtom.notice);
  const setWishlistUrl = useSetAtom(invitationEditorAtom.wishlistUrl);
  const setBankAccount = useSetAtom(invitationEditorAtom.bankAccount);
  const setSelectedFontFamily = useSetAtom(
    invitationEditorAtom.selectedFontFamily,
  );
  const setWishlistText = useSetAtom(invitationEditorAtom.wishlistText);

  useEffect(() => {
    if (!invitation) return;
    if (invitation.layoutOrder) {
      setLayoutOrder(JSON.parse(invitation.layoutOrder));
    }
    if (invitation.templateNo) {
      setSelectedTemplateNo(invitation.templateNo);
    }
    if (invitation.date) {
      const formattedDate = day(invitation.date);
      setSelectedDate(formattedDate.format('MM/DD/YYYY'));
    }
    if (invitation.greetingTitle) {
      setGreetingTitle(invitation.greetingTitle);
    }
    if (invitation.greetingContent) {
      setGreetingContent(invitation.greetingContent);
    }
    if (invitation.bgColor) {
      setBgColor(invitation.bgColor);
    }
    if (invitation.mainTextColor) {
      setMainTextColor(parseColor(invitation.mainTextColor));
    }
    if (invitation.pointColor) {
      setSelectedPointColor(invitation.pointColor);
    }
    if (invitation.brideFirstName) {
      setBrideFirstName(invitation.brideFirstName);
    }
    if (invitation.groomFirstName) {
      setGroomFirstName(invitation.groomFirstName);
    }
    if (invitation.dressCodeGentleman) {
      setDressCodeGentleman(invitation.dressCodeGentleman);
    }
    if (invitation.dressCodeLady) {
      setDressCodeLady(invitation.dressCodeLady);
    }
    if (invitation.dressCodeMainColor) {
      setDressCodeMainColor(parseColor(invitation.dressCodeMainColor));
    }
    if (invitation.dressCodeSubColor) {
      setDressCodeSecondaryColor(parseColor(invitation.dressCodeSubColor));
    }
    if (invitation.dressCodeThirdColor) {
      setDressCodeThirdColor(parseColor(invitation.dressCodeThirdColor));
    }
    if (invitation.primarySponsor) {
      setPrimarySponsor(invitation.primarySponsor);
    }
    if (invitation.secondarySponsor) {
      setSecondarySponsor(invitation.secondarySponsor);
    }
    if (invitation.bestMan) {
      setBestMan(invitation.bestMan);
    }
    if (invitation.maidOfHonor) {
      setMaidOfHonor(invitation.maidOfHonor);
    }
    if (invitation.groomsMen) {
      setGroomsMen(invitation.groomsMen);
    }
    if (invitation.bridesMaids) {
      setBridesMaids(invitation.bridesMaids);
    }
    if (invitation.endingText) {
      setEndingText(invitation.endingText);
    }
    if (invitation.notice) {
      setNotice(invitation.notice);
    }
    if (invitation.wishlistUrl) {
      setWishlistUrl(invitation.wishlistUrl);
    }
    if (invitation.bankAccount) {
      setBankAccount(invitation.bankAccount);
    }
    if (invitation.baseFont) {
      setSelectedFontFamily(invitation.baseFont);
    }
    if (invitation.wishlistText) {
      setWishlistText(invitation.wishlistText);
    }
  }, [invitation]);
}
