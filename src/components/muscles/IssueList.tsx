import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { memo, useCallback } from 'react';
import { StyleSheet, FlatList, ListRenderItem } from 'react-native';
import { Routes } from '../../routes/types';
import { IssueDto } from '../../services/types';
import { Label } from '../atoms/Label';
import { Space } from '../atoms/Space';
import { IssueItem } from '../molecules/IssueItem';
import { RetryRequest } from '../molecules/RetryRequest';

type IssuesListProps = {
  items: IssueDto[];
  onEndReached?: () => void;
  hasError?: boolean;
  isBusy?: boolean;
};

export const IssuesList: React.FC<IssuesListProps> = memo(
  ({ items, onEndReached, hasError = false, isBusy = false }) => {
    const navigation = useNavigation();

    const renderItem: ListRenderItem<IssueDto> = useCallback(
      ({ item }) => (
        <IssueItem
          item={item}
          onPress={() =>
            navigation.dispatch(
              CommonActions.navigate({
                name: Routes.IssueDetail,
                params: { issueNumber: item.number },
              })
            )
          }
        />
      ),
      []
    );

    return (
      <FlatList
        contentContainerStyle={styles.scrollContainer}
        data={items}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Space />}
        keyExtractor={(item) => `${item.number}`}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.2}
        ListFooterComponent={() =>
          hasError ? <RetryRequest onRetry={onEndReached} /> : null
        }
        ListEmptyComponent={() =>
          !isBusy ? <Label>List is empty!</Label> : null
        }
      />
    );
  }
);

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
});
