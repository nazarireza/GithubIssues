import { memo } from 'react';
import { View } from 'react-native';
import { SizeProp, Sizes } from '../../assets/sizes';

type SpaceProps = {
  size?: SizeProp;
};

export const Space: React.FC<SpaceProps> = memo(({ size = 'small' }) => {
  return <View style={{ width: Sizes[size], height: Sizes[size] }} />;
});
