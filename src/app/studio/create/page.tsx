import { Suspense } from 'react';

import InvitationEditor from '@/components/studio/InvitationEditor';

function CreateInvitationPage() {
  return (
    <Suspense>
      <InvitationEditor />
    </Suspense>
  );
}

export default CreateInvitationPage;
