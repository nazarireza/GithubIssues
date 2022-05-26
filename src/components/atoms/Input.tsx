import { forwardRef, memo } from 'react';
import { TextInput, TextInputProps, StyleSheet } from 'react-native';

export const Input = memo(
  forwardRef<TextInput, TextInputProps>(({ style, ...rest }, ref) => {
    return <TextInput style={[styles.container, style]} ref={ref} {...rest}  />;
  })
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});
