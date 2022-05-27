import React, { memo, useState } from 'react';
import { View, ActivityIndicator, StyleSheet, ViewProps } from 'react-native';
import { useTimeout } from '../../utilities/useTimeout';

interface LoadingContainerProps {
  isInitial?: boolean;
  isBusy?: boolean;
  hasOverlay?: boolean;
  withIndicator?: boolean;
}

export const LoadingContainer: React.FC<LoadingContainerProps & ViewProps> =
  memo(({ children, isBusy = false, style, ...rest }) => {
    const [shouldBeShow, setShouldBeShow] = useState(isBusy);

    useTimeout(() => setShouldBeShow(isBusy), [isBusy], isBusy ? 500 : 0);

    return (
      <View {...rest} style={[styles.container, style]}>
        {children}
        {shouldBeShow && (
          <View style={[styles.indicatorContainer]}>
            <ActivityIndicator size="large" color="orange" />
          </View>
        )}
      </View>
    );
  });

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  indicatorContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
