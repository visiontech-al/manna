import { StyleSheet, TextInput, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  variant?: 'default' | 'filled';
}

export function Input({
  style,
  variant = 'default',
  placeholderTextColor = '#8E8E93',
  ...props
}: InputProps) {
  return (
    <TextInput
      placeholderTextColor={placeholderTextColor}
      style={[styles.input, styles[variant], style]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    minHeight: 48,
    borderRadius: 12,
    color: '#11181C',
    fontSize: 16,
    paddingHorizontal: 16,
  },
  default: {
    borderColor: '#D1D1D6',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
  },
  filled: {
    backgroundColor: '#F2F2F7',
  },
});
