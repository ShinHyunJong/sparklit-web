import { Suspense } from 'react';

import RSVPlistPage from '@/components/rsvp/RSVPlist';

function RSVPPage() {
  return (
    <Suspense>
      <RSVPlistPage></RSVPlistPage>
    </Suspense>
  );
}
export default RSVPPage;
