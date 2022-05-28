import { memo } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

type IconButtonProps = {
  name: 'star' | 'star-outline' | 'bookmark-outline';
};

export const IconButton: React.FC<IconButtonProps & TouchableOpacityProps> =
  memo(({ name, style, ...rest }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.container, style]}
        {...rest}
      >
        <Icon name={name} size={30} />
      </TouchableOpacity>
    );
  });

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,.1)',
    borderRadius: 5,
    padding: 8,
  },
});
