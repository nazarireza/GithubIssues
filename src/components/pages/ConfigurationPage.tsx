import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import { View, StyleSheet, ScrollView, TextInput } from 'react-native';
import { RootStackComponent, Routes } from '../../routes/types';
import { Button } from '../atoms/Button';
import { Space } from '../atoms/Space';
import { FieldInput } from '../molecules/FieldInput';
import { useTranslation } from '../../assets/dictionary';
import { setConfigurations } from '../../store/slices/appSlice';
import { useValidation } from 'react-simple-form-validator';
import { useDispatch } from 'react-redux';

enum fields {
  organization = 'organization',
  repository = 'repository',
}

export const ConfigurationPage: RootStackComponent<Routes.Configuration> = memo(
  ({ navigation, route }) => {
    const { t } = useTranslation();
    const [organization, setOrganization] = useState('');
    const [repository, setRepository] = useState('');

    const [touchedFields, setTouchedFields] = useState({
      organization: false,
      repository: false,
    });

    const repositoryInputRef = useRef<TextInput>(null);

    const dispatch = useDispatch();

    const { isFieldInError, getErrorsInField, isFormValid } = useValidation({
      fieldsRules: {
        organization: { required: true },
        repository: { required: true },
      },
      state: { organization, repository },
    });

    const onFiledBlur = (field: fields) =>
      setTouchedFields((prevFields) => ({ ...prevFields, [field]: true }));

    const onSubmit = useCallback(() => {
      if (!isFormValid) return;

      dispatch(
        setConfigurations({
          organization: organization.trim() as string, // validation was checked by the validator (don't worry about it)
          repository: repository.trim() as string,
        })
      );

      // The user will not be allowed to navigate back (UX)
      navigation.replace(Routes.Issues);
    }, [organization, repository, isFormValid]);

    return (
      <View style={styles.container}>
        <ScrollView>
          <FieldInput
            title={t('Organization')}
            autoCapitalize="none"
            value={organization}
            onChangeText={(value) => setOrganization(value)}
            hasError={
              touchedFields.organization && isFieldInError(fields.organization)
            }
            errorMessages={getErrorsInField(fields.organization)}
            onBlur={() => onFiledBlur(fields.organization)}
            returnKeyType="next"
            onSubmitEditing={() => repositoryInputRef.current?.focus()}
          />
          <Space size="medium" />
          <FieldInput
            ref={repositoryInputRef}
            autoCapitalize="none"
            title={t('Repository')}
            value={repository}
            onChangeText={(value) => setRepository(value)}
            hasError={
              touchedFields.repository && isFieldInError(fields.repository)
            }
            errorMessages={getErrorsInField(fields.repository)}
            onBlur={() => onFiledBlur(fields.repository)}
            returnKeyType="done"
          />
          <Space size="large" />
          <Button
            title={t('Go to Issues')}
            onPress={onSubmit}
            disabled={!isFormValid}
          />
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
