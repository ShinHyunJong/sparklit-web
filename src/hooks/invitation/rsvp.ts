import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import { getRSVPlistApi } from './api';

export function useRSVP() {
  const searchParams = useSearchParams();
  const uid = searchParams.get('uid');
  const { data, isLoading } = useQuery({
    queryKey: ['rsvpList'],
    queryFn: () => getRSVPlistApi(uid!),
    enabled: !!uid,
  });
  return { rsvpList: data, isLoading };
}
