import { useAtomValue } from 'jotai';

import invitationEditorAtom from '@/atoms/invitationEditor';
import GreetingView from '@/components/invitation/GreetingView';

function Greeting() {
  const title = useAtomValue(invitationEditorAtom.greetingTitle);
  const content = useAtomValue(invitationEditorAtom.greetingContent);
  const pointColor = useAtomValue(invitationEditorAtom.selectedPointColor);
  const groomFirstName = useAtomValue(invitationEditorAtom.groomFirstName);
  const brideFirstName = useAtomValue(invitationEditorAtom.brideFirstName);
  return (
    <GreetingView
      title={title}
      content={content}
      pointColor={pointColor}
      groomFirstName={groomFirstName}
      brideFirstName={brideFirstName}
    ></GreetingView>
  );
}

export default Greeting;
