import React, { memo, useCallback } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { RootStackComponent, Routes } from '../../routes/types';
import { Button } from '../atoms/Button';
import { Space } from '../atoms/Space';
import { FieldInput } from '../molecules/FieldInput';
import { useTranslation } from '../../assets/dictionary';

export const ConfigurationPage: RootStackComponent<Routes.Configuration> = memo(
  ({ navigation, route }) => {
    const { t } = useTranslation();

    const onSubmit = useCallback(() => {
      // The user will not be allowed to navigate back (UX)
      navigation.replace(Routes.Issues);
    }, []);

    return (
      <View style={styles.container}>
        <ScrollView>
          <FieldInput title={t('Organization')} placeholder="necolas" />
          <Space size="medium" />
          <FieldInput title={t('Repository')} placeholder="react-native-web" />
          <Space size="large" />
          <Button title={t('Go to Issues')} onPress={onSubmit} />
        </ScrollView>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
});
