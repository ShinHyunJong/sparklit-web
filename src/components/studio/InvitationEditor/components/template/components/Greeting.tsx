import { useAtomValue } from 'jotai';

import invitationEditorAtom from '@/atoms/invitationEditor';
import GreetingView from '@/components/invitation/GreetingView';

function Greeting() {
  const title = useAtomValue(invitationEditorAtom.greetingTitle);
  const content = useAtomValue(invitationEditorAtom.greetingContent);
  const pointColor = useAtomValue(invitationEditorAtom.selectedPointColor);
  const groomFirstName = useAtomValue(invitationEditorAtom.groomFirstName);
  const brideFirstName = useAtomValue(invitationEditorAtom.brideFirstName);

  const groomMiddleName = useAtomValue(invitationEditorAtom.groomMiddleName);
  const brideMiddleName = useAtomValue(invitationEditorAtom.brideMiddleName);
  const brideLastName = useAtomValue(invitationEditorAtom.brideLastName);
  const groomLastName = useAtomValue(invitationEditorAtom.groomLastName);

  const groomDadName = useAtomValue(invitationEditorAtom.groomDadName);
  const groomMomName = useAtomValue(invitationEditorAtom.groomMomName);

  const brideMomName = useAtomValue(invitationEditorAtom.brideMomName);
  const brideDadName = useAtomValue(invitationEditorAtom.brideDadName);

  const selectedFontFamily = useAtomValue(
    invitationEditorAtom.selectedFontFamily,
  );
  return (
    <GreetingView
      title={title}
      content={content}
      pointColor={pointColor}
      groomFirstName={groomFirstName}
      brideFirstName={brideFirstName}
      groomDadName={groomDadName}
      groomMiddleName={groomMiddleName}
      groomMomName={groomMomName}
      brideMiddleName={brideMiddleName}
      brideMomName={brideMomName}
      brideLastName={brideLastName}
      groomLastName={groomLastName}
      brideDadName={brideDadName}
      fontFamily={selectedFontFamily}
    ></GreetingView>
  );
}

export default Greeting;
