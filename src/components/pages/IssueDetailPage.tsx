import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootStackComponent, Routes } from '../../routes/types';
import { useGetSingleIssueQuery } from '../../services/api';
import { IssueDto } from '../../services/types';
import { RootState } from '../../store';
import { unBookmark, bookmark } from '../../store/slices/bookmarkSlice';
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
    const {
      app: { organization, repository },
      bookmark: { items: bookmarks },
    } = useSelector((state: RootState) => state);

    const dispatch = useDispatch();

    const { data, refetch, ...result } = useGetSingleIssueQuery({
      organization: organization as string,
      repository: repository as string,
      issueNumber,
    });

    const isBookmarked = useMemo(
      () => data && bookmarks.findIndex((p) => p.number === data.number) !== -1,
      [bookmarks, data]
    );

    const onToggleBookmark = useCallback(() => {
      if (!isBookmarked) dispatch(bookmark(data as IssueDto));
      else dispatch(unBookmark(data as IssueDto));
    }, [data, isBookmarked]);

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
          {data && (
            <IssueDetailItem item={data} onToggleBookmark={onToggleBookmark} />
          )}
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
