import { memo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { IssueDto } from '../../services/types';
import { Label } from '../atoms/Label';
import { Space } from '../atoms/Space';
import Markdown from 'react-native-markdown-display';

type IssueDetailItemProps = {
  item: IssueDto;
};

export const IssueDetailItem: React.FC<IssueDetailItemProps> = memo(
  ({ item: { number, title, body, state, created_at } }) => {
    return (
      <View>
        <Label style={styles.title}>{title}</Label>
        <Space />
        <Markdown>{body}</Markdown>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  }
});
