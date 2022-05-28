import React, { forwardRef, memo } from 'react';
import { TextInputProps, View, StyleSheet, TextInput } from 'react-native';
import { Input } from '../atoms/Input';
import { Label } from '../atoms/Label';
import { Space } from '../atoms/Space';

type FieldInputProps = {
  title?: string;
  hasError?: boolean;
  errorMessages?: string[];
};

export const FieldInput = memo(
  forwardRef<TextInput, FieldInputProps & TextInputProps>(
    ({ title, hasError, errorMessages, ...rest }, ref) => {
      return (
        <View>
          <Label>{title}</Label>
          <Space />
          <Input testID="input" ref={ref} {...rest} />
          <Space />
          {hasError && (
            <Label style={styles.errorMessage}>{errorMessages?.[0]}</Label>
          )}
        </View>
      );
    }
  )
);

const styles = StyleSheet.create({
  errorMessage: {
    color: 'red',
  },
});
