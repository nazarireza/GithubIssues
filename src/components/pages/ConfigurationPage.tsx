import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import { StyleSheet, ScrollView, TextInput } from 'react-native';
import { RootStackComponent, Routes } from '../../routes/types';
import { Button } from '../atoms/Button';
import { Space } from '../atoms/Space';
import { FieldInput } from '../molecules/FieldInput';
import { useTranslation } from '../../assets/dictionary';
import { setConfigurations } from '../../store/slices/appSlice';
import { useValidation } from 'react-simple-form-validator';
import { useDispatch } from 'react-redux';
import { useLazyGetRepoDetailQuery } from '../../services/api';
import { Label } from '../atoms/Label';
import { LoadingContainer } from '../atoms/LoadingContainer';

enum fields {
  organization = 'organization',
  repository = 'repository',
}

export const ConfigurationPage: RootStackComponent<Routes.Configuration> = memo(
  ({ navigation, route }) => {
    const { t } = useTranslation();
    const [organization, setOrganization] = useState('');
    const [repository, setRepository] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [touchedFields, setTouchedFields] = useState({
      organization: false,
      repository: false,
    });

    const repositoryInputRef = useRef<TextInput>(null);

    const dispatch = useDispatch();

    const [getRepo, result] = useLazyGetRepoDetailQuery();

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

      // validation was checked by the validator (don't worry about it)
      const normalizedOrganization = organization.trim() as string;
      const normalizedRepository = repository.trim() as string;

      getRepo({
        organization: normalizedOrganization,
        repository: normalizedRepository,
      }).then((r) => {
        if (r.isSuccess) {
          dispatch(
            setConfigurations({
              organization: normalizedOrganization,
              repository: normalizedRepository,
            })
          );

          // The user will not be allowed to navigate back (UX)
          navigation.replace(Routes.Issues);
        } else setErrorMessage(t('Organization or Repository is not valid'));
      });
    }, [organization, repository, isFormValid]);

    return (
      <LoadingContainer style={styles.container} isBusy={result.isFetching}>
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
          {!!errorMessage && (
            <>
              <Space />
              <Label style={styles.errorMessage}>{errorMessage}</Label>
            </>
          )}
        </ScrollView>
      </LoadingContainer>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  errorMessage: {
    color: 'red',
  },
});
