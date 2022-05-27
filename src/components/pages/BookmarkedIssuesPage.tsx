import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootStackComponent, Routes } from '../../routes/types';
import { RootState } from '../../store';
import { IssuesList } from '../muscles/IssueList';

export const BookmarkedIssuesPage: RootStackComponent<Routes.BookmarkedIssues> =
  memo(({ navigation, route }) => {
    const { items } = useSelector((state: RootState) => state.bookmark);

    return (
      <View style={styles.container}>
        <IssuesList items={items} />
      </View>
    );
  });

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
