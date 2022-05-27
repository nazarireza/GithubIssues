import React, { memo, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootStackComponent, Routes } from '../../routes/types';
import { useGetSingleIssueQuery } from '../../services/api';
import { RootState } from '../../store';
import { LoadingContainer } from '../atoms/LoadingContainer';
import { IssueDetailItem } from '../molecules/IssueDetailItem';
import { RetryRequest } from '../molecules/RetryRequest';

export const IssueDetailPage: RootStackComponent<Routes.IssueDetail> = memo(
  ({
    navigation,
    route: {
      params: { issueNumber },
    },
  }) => {
    const { organization, repository } = useSelector(
      (state: RootState) => state.app
    );

    const { data, refetch, ...result } = useGetSingleIssueQuery({
      organization: organization as string,
      repository: repository as string,
      issueNumber,
    });

    useEffect(
      () =>
        navigation.setOptions({
          title: `Issue #${issueNumber}`,
        }),
      []
    );

    return (
      <LoadingContainer style={styles.container} isBusy={result.isLoading}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {result.isError && <RetryRequest onRetry={refetch} />}
          {data && <IssueDetailItem item={data} />}
        </ScrollView>
      </LoadingContainer>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
});
