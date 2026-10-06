import { useCallback, useState } from 'react';
import type { z } from 'zod';

type FieldErrors<T> = Partial<Record<keyof T, string>>;

/**
 * Minimal string-field form state with zod validation.
 * `validate` sets per-field errors (first issue per field) and returns parsed data or null.
 */
export function useForm<T extends Record<string, string>>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FieldErrors<T>>({});

  const setField = useCallback((field: keyof T, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  }, []);

  const validate = useCallback(
    <Output>(schema: z.ZodType<Output>): Output | null => {
      const result = schema.safeParse(values);

      if (result.success) {
        setErrors({});
        return result.data;
      }

      const nextErrors: FieldErrors<T> = {};

      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof T | undefined;

        if (field !== undefined && !nextErrors[field]) {
          nextErrors[field] = issue.message;
        }
      }

      setErrors(nextErrors);
      return null;
    },
    [values]
  );

  const reset = useCallback((nextValues: T) => {
    setValues(nextValues);
    setErrors({});
  }, []);

  return { values, errors, setField, validate, reset };
}
