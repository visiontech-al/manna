import type { ConfirmOptions } from './types';

/** Web version of `confirm`, using the browser's built-in OK / Cancel dialog. */
export function confirm({ title, message, onConfirm }: ConfirmOptions) {
  if (window.confirm(`${title}\n\n${message}`)) {
    onConfirm();
  }
}
