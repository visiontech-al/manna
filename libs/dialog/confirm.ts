import { Alert } from 'react-native';

import type { ConfirmOptions } from './types';

/**
 * Native confirm dialog with Cancel / confirm buttons.
 * Web uses `confirm.web.ts` because `Alert.alert` is a no-op on react-native-web.
 */
export function confirm({ title, message, confirmLabel, destructive = false, onConfirm }: ConfirmOptions) {
  Alert.alert(title, message, [
    { text: 'Cancel', style: 'cancel' },
    { text: confirmLabel, style: destructive ? 'destructive' : 'default', onPress: onConfirm },
  ]);
}
