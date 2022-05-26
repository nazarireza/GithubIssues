import React, { memo } from 'react';
import { TextInputProps, View } from 'react-native';
import { Input } from '../atoms/Input';
import { Label } from '../atoms/Label';
import { Space } from '../atoms/Space';

type FieldInputProps = {
  title?: string;
};

export const FieldInput: React.FC<FieldInputProps & TextInputProps> = memo(
  ({ title, ...rest }) => {
    return (
      <View>
        <Label>{title}</Label>
        <Space />
        <Input {...rest} />
      </View>
    );
  }
);
