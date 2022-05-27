import { memo } from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';

export const Card: React.FC<ViewProps> = memo(({ style, ...rest }) => {
  return <View style={[styles.container, style]} {...rest} />;
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    borderColor: 'rgba(0,0,0,.1)',
    borderWidth: 1,
  },
});
