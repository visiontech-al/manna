import { useEffect } from 'react';

import { LocalAuthService } from '@/services';
import { useAppDispatch } from '@/store';
import { setAuthInitialized, setCredentials } from '@/store/redux/slices/auth';

/** Restores the saved session once on app start, then marks auth as initialized. */
export function useAuthBootstrap() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let cancelled = false;

    LocalAuthService.restoreSession()
      .then((session) => {
        if (cancelled) {
          return;
        }

        if (session) {
          dispatch(setCredentials(session));
        } else {
          dispatch(setAuthInitialized());
        }
      })
      .catch(() => {
        if (!cancelled) {
          dispatch(setAuthInitialized());
        }
      });

    return () => {
      cancelled = true;
    };
  }, [dispatch]);
}
