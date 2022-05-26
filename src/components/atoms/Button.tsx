import { forwardRef, memo } from 'react';
import { Button as RNButton, ButtonProps } from 'react-native';

// On Android the given title will be converted to the uppercased form.

export const Button = memo(
  forwardRef<RNButton, ButtonProps>((props, ref) => {
    return <RNButton {...props} />;
  })
);
