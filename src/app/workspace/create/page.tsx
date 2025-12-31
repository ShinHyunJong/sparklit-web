import { useTranslations } from 'next-intl';

import InvitationEditor from '@/components/workspace/InvitationEditor';

function CreateInvitationPage() {
  const t = useTranslations('workspace.invitationEditor');
  return <InvitationEditor />;
}

export default CreateInvitationPage;
