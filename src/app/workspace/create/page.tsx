import { Suspense } from 'react';

import InvitationEditor from '@/components/workspace/InvitationEditor';

function CreateInvitationPage() {
  return (
    <Suspense>
      <InvitationEditor />
    </Suspense>
  );
}

export default CreateInvitationPage;
