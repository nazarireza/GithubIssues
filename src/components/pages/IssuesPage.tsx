import React, { memo, useCallback, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootStackComponent, Routes } from '../../routes/types';
import { useLazyGetIssuesQuery } from '../../services/api';
import { IssueDto, IssueState } from '../../services/types';
import { RootState } from '../../store';
import { IconButton } from '../atoms/IconButton';
import { LoadingContainer } from '../atoms/LoadingContainer';
import { Space } from '../atoms/Space';
import { KeyValueData, SelectableList } from '../molecules/SelectableList';
import { IssuesList } from '../muscles/IssueList';

const states: KeyValueData<IssueState>[] = [
  { id: 'all', value: 'All' },
  { id: 'open', value: 'Open' },
  { id: 'closed', value: 'Closed' },
];

const ITEMS_PER_PAGE = 20;

export const IssuesPage: RootStackComponent<Routes.Issues> = memo(
  ({ navigation, route }) => {
    const [state, setState] = useState<IssueState>('open');
    const [finished, setIsFinished] = useState(false);
    const [items, setItems] = useState<IssueDto[]>([]);

    const { organization, repository } = useSelector(
      (state: RootState) => state.app
    );

    useEffect(
      () =>
        navigation.setOptions({
          headerRight: () => (
            <IconButton
              name="bookmark-outline"
              onPress={() => navigation.navigate(Routes.BookmarkedIssues)}
            />
          ),
        }),
      []
    );

    const [get, result] = useLazyGetIssuesQuery();

    const onGetResult = useCallback((result: IssueDto[], reset: boolean) => {
      if (result.length < ITEMS_PER_PAGE) setIsFinished(true);
      setItems((prev) => (reset ? result : prev.concat(result)));
    }, []);

    useEffect(() => {
      // reset the app state when the "state" is changed
      setItems([]);
      setIsFinished(false);

      get({
        organization: organization as string,
        repository: repository as string,
        state,
        page: 1, // The items will be reset when state is changed
        per_page: ITEMS_PER_PAGE,
      }).then((result) => onGetResult(result.data || [], true));
    }, [state]);

    const onEndReached = useCallback(() => {
      if (result.isFetching || finished) return;

      get({
        organization: organization as string,
        repository: repository as string,
        state,
        page: Math.ceil(items.length / ITEMS_PER_PAGE) + 1,
        per_page: ITEMS_PER_PAGE,
      }).then((result) => onGetResult(result.data || [], false));
    }, [finished, result.isFetching, items.length, state]);

    return (
      <LoadingContainer style={styles.container} isBusy={result.isFetching}>
        <Space size="medium" />
        <SelectableList
          data={states}
          selectedId={state}
          onChangeItem={({ id }) => setState(id)}
        />
        <Space />
        <IssuesList
          items={items}
          onEndReached={onEndReached}
          hasError={result.isError}
          isBusy={result.isFetching}
        />
      </LoadingContainer>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
