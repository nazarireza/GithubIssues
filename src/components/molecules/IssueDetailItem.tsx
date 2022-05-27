import { memo, useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { IssueDto } from '../../services/types';
import { Label } from '../atoms/Label';
import { Space } from '../atoms/Space';
import Markdown from 'react-native-markdown-display';
import { IconButton } from '../atoms/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { bookmark, unBookmark } from '../../store/slices/bookmarkSlice';

type IssueDetailItemProps = {
  item: IssueDto;
};

export const IssueDetailItem: React.FC<IssueDetailItemProps> = memo(
  ({ item }) => {
    const dispatch = useDispatch();
    const { items } = useSelector((state: RootState) => state.bookmark);

    const isBookmarked = useMemo(
      () => items.findIndex((p) => p.number === item.number) !== -1,
      [items, item]
    );

    const toggleBookmark = useCallback(() => {
      if (!isBookmarked) dispatch(bookmark(item));
      else dispatch(unBookmark(item));
    }, [item, isBookmarked]);

    return (
      <View>
        <Label style={styles.title}>{item.title}</Label>
        <Space />
        <IconButton
          name={isBookmarked ? 'star' : 'star-outline'}
          onPress={toggleBookmark}
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
