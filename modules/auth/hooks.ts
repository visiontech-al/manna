import { useState } from 'react';

import { useForm } from '@/hooks/use-form';
import { LocalAuthService, ServiceError } from '@/services';
import { useAppDispatch } from '@/store';
import { setCredentials } from '@/store/redux/slices/auth';
import type { AuthResponse } from '@/types/user';

import { loginSchema, registerSchema } from './schemas';

const FALLBACK_ERROR = 'Something went wrong. Please try again.';

/** Shared submit state: runs the request, stores credentials, surfaces a form-level error. */
function useAuthSubmit() {
  const dispatch = useAppDispatch();
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const run = async (request: () => Promise<AuthResponse>) => {
    setSubmitting(true);
    setFormError(null);

    try {
      // PublicGuard redirects to the dashboard once credentials are set.
      dispatch(setCredentials(await request()));
    } catch (error) {
      setFormError(error instanceof ServiceError ? error.message : FALLBACK_ERROR);
      setSubmitting(false);
    }
  };

  return { submitting, formError, run };
}

export function useLoginForm() {
  const form = useForm({ email: '', password: '' });
  const { submitting, formError, run } = useAuthSubmit();

  const submit = () => {
    const data = form.validate(loginSchema);

    if (data) {
      run(() => LocalAuthService.login(data));
    }
  };

  return { ...form, submitting, formError, submit };
}

export function useRegisterForm() {
  const form = useForm({ name: '', email: '', password: '', confirmPassword: '' });
  const { submitting, formError, run } = useAuthSubmit();

  const submit = () => {
    const data = form.validate(registerSchema);

    if (data) {
      run(() =>
        LocalAuthService.register({ name: data.name, email: data.email, password: data.password })
      );
    }
  };

  return { ...form, submitting, formError, submit };
}
