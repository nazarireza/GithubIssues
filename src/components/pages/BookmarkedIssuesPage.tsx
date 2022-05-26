import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RootStackComponent, Routes } from '../../routes/types';

export const BookmarkedIssuesPage: RootStackComponent<Routes.BookmarkedIssues> = memo(
  ({ navigation, route }) => {
    return (
      <View style={styles.container}>
        <Text>Bookmarked Issues Page</Text>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
