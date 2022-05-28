import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { IssueDto } from '../../services/types';
import { Label } from '../atoms/Label';
import { Space } from '../atoms/Space';
import Markdown from 'react-native-markdown-display';
import { IconButton } from '../atoms/IconButton';

type IssueDetailItemProps = {
  item: IssueDto;
  isBookmarked?: boolean;
  onToggleBookmark?: () => void;
};

export const IssueDetailItem: React.FC<IssueDetailItemProps> = memo(
  ({ item, isBookmarked = false, onToggleBookmark }) => {
    return (
      <View>
        <Label style={styles.title}>{item.title}</Label>
        <Space />
        <IconButton
          testID="bookmark"
          name={isBookmarked ? 'star' : 'star-outline'}
          onPress={onToggleBookmark}
        />
        <Space />
        <Markdown>{item.body}</Markdown>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
