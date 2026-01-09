import { useAtom, useAtomValue } from 'jotai';
import { Fade } from 'react-awesome-reveal';

import invitationEditorAtom from '@/atoms/invitationEditor';
import { useInvitationDetail } from '@/hooks/invitation';

import Template1 from '../Template1';
import Template2 from '../Template2';
import Template3 from '../Template3';
import Template4 from '../Template4';

function MainTemplate() {
  const [selectedDate] = useAtom(invitationEditorAtom.selectedDate);
  const [selectedTemplateNo] = useAtom(invitationEditorAtom.selectedTemplateNo);
  const [mainTextColor] = useAtom(invitationEditorAtom.selectedMainColor);
  const pointColor = useAtomValue(invitationEditorAtom.selectedPointColor);
  const { invitationDetail } = useInvitationDetail();

  const mainPhoto = invitationDetail?.invitationCoverPhotoList
    ? invitationDetail.invitationCoverPhotoList.filter(
        (x) => x.type === 'main',
      )[0]
    : null;

  const firstPlace = invitationDetail?.placeList
    ? invitationDetail.placeList[0]
    : null;

  const firstTime = firstPlace?.timeList ? firstPlace.timeList[0] : null;
  const renderTemplate = () => {
    switch (selectedTemplateNo) {
      case 1:
        return <Template1></Template1>;

      case 2:
        return (
          <Template2
            date={selectedDate}
            mainPhoto={mainPhoto}
            firstTime={firstTime}
          ></Template2>
        );

      case 3:
        return (
          <Template3
            date={selectedDate}
            mainPhoto={mainPhoto}
            pointColor={pointColor}
            firstTime={firstTime}
            mainTextColor={mainTextColor}
          ></Template3>
        );

      case 4:
        return (
          <Template4
            date={selectedDate}
            mainPhoto={mainPhoto}
            firstTime={firstTime}
            mainTextColor={mainTextColor}
          ></Template4>
        );

      default:
        break;
    }
  };

  return <Fade triggerOnce>{renderTemplate()}</Fade>;
}

export default MainTemplate;
