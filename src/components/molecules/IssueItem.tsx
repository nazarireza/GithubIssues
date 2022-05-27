import { memo } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { IssueDto } from '../../services/types';
import { Card } from '../atoms/Card';
import { Label } from '../atoms/Label';

type IssueItemProps = {
  item: IssueDto;
  isBookmarked?: boolean;
};

export const IssueItem: React.FC<IssueItemProps & TouchableOpacityProps> = memo(
  ({
    item: { id, title, body, state, created_at },
    isBookmarked = false,
    ...rest
  }) => {
    return (
      <TouchableOpacity activeOpacity={0.7} {...rest}>
        <Card>
          <Label style={styles.title}>{title}</Label>
        </Card>
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
  },
});
