import { useState } from 'react';
import { z } from 'zod';

import { DEFAULT_CALORIE_GOAL, MAX_CALORIE_GOAL, MIN_CALORIE_GOAL } from '@/constants/app';
import { useForm } from '@/hooks/use-form';
import { LocalAuthService, ServiceError } from '@/services';
import { useAppDispatch, useAppSelector } from '@/store';
import { clearCredentials, setUser } from '@/store/redux/slices/auth';

const profileSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters'),
  calorieGoal: z
    .string()
    .trim()
    .min(1, 'Daily goal is required')
    .pipe(
      z.coerce
        .number<string>({ error: 'Daily goal must be a number' })
        .int('Use a whole number')
        .min(MIN_CALORIE_GOAL, `Goal must be at least ${MIN_CALORIE_GOAL} kcal`)
        .max(MAX_CALORIE_GOAL, `Goal must be at most ${MAX_CALORIE_GOAL} kcal`)
    ),
});

export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

export function useProfileForm() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const form = useForm({
    name: user?.name ?? '',
    calorieGoal: String(user?.calorieGoal ?? DEFAULT_CALORIE_GOAL),
  });
  const [status, setStatus] = useState<SaveStatus>('idle');
  const [message, setMessage] = useState<string | null>(null);

  const isDirty =
    form.values.name.trim() !== (user?.name ?? '') ||
    form.values.calorieGoal.trim() !== String(user?.calorieGoal ?? DEFAULT_CALORIE_GOAL);

  const setField: typeof form.setField = (field, value) => {
    form.setField(field, value);
    setStatus('idle');
  };

  const save = async () => {
    const data = form.validate(profileSchema);

    if (!data || !user) {
      return;
    }

    setStatus('saving');

    try {
      const updated = await LocalAuthService.updateProfile(user.email, data);
      dispatch(setUser(updated));
      form.reset({ name: updated.name, calorieGoal: String(updated.calorieGoal) });
      setStatus('saved');
      setMessage(null);
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof ServiceError ? error.message : 'Could not save your changes.');
    }
  };

  return { ...form, setField, isDirty, status, message, save };
}

export function useLogout() {
  const dispatch = useAppDispatch();

  return async () => {
    try {
      await LocalAuthService.logout();
    } finally {
      // PrivateGuard redirects to login once credentials are cleared.
      dispatch(clearCredentials());
    }
  };
}
