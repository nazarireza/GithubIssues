import { memo } from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { useTranslation } from '../../assets/dictionary';
import { Button } from '../atoms/Button';
import { Label } from '../atoms/Label';
import { Space } from '../atoms/Space';

type RetryRequestProps = {
  message?: string;
  onRetry?: () => void;
};

export const RetryRequest: React.FC<RetryRequestProps & ViewProps> = memo(
  ({ message, onRetry, style, ...rest }) => {
    const { t } = useTranslation();

    message = message || t("Something's Wrong");
    return (
      <View style={[styles.container, style]} {...rest}>
        <Label>{message}</Label>
        <Space />
        <Button title={t('Retry')} onPress={onRetry} />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});
