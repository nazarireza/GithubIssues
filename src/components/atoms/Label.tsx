import { forwardRef, memo } from 'react';
import { Text, TextProps } from 'react-native';

export const Label = memo(
  forwardRef<Text, TextProps>((props, ref) => {
    return <Text {...props} />;
  })
);
