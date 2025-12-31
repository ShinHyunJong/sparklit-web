import { useTranslations } from 'next-intl';
import { Suspense } from 'react';

import InvitationEditor from '@/components/workspace/InvitationEditor';

function CreateInvitationPage() {
  const t = useTranslations('workspace.invitationEditor');
  return (
    <Suspense>
      <InvitationEditor />
    </Suspense>
  );
}

export default CreateInvitationPage;
