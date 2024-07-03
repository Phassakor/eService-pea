// hooks/useRedirect.ts

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
const useRedirect = () => {
  const router = useRouter();

  const redirectTo = useCallback((path?: string) => {
    router.push(path || "/status/success-form");
  }, [router]);

  return redirectTo;
};

export default useRedirect;
