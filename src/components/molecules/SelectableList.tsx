import { memo } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Label } from '../atoms/Label';

export type KeyValueData<T> = {
  id: T;
  value: string;
};

type SelectableListProps = {
  data: KeyValueData<any>[];
  selectedId?: any;
  onChangeItem?: (item: KeyValueData<any>) => void;
};

export const SelectableList: React.FC<SelectableListProps> = memo(
  ({ data, selectedId, onChangeItem }) => {
    return (
      <View style={styles.container}>
        {data.map((item, index) => (
          <SelectableListItem
            item={item}
            key={item.id}
            selected={item.id === selectedId}
            onSelect={onChangeItem}
          />
        ))}
      </View>
    );
  }
);

type SelectableListItemProps = {
  item: KeyValueData<string>;
  onSelect?: (item: KeyValueData<string>) => void;
  selected?: boolean;
};

const SelectableListItem: React.FC<SelectableListItemProps> = memo(
  ({ item, selected = false, onSelect }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => onSelect?.(item)}
        style={[styles.itemContainer, selected && styles.itemContainerSelected]}
      >
        <Label style={[styles.itemTitle, selected && styles.itemTitleSelected]}>
          {item.value}
        </Label>
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  itemContainer: {
    padding: 8,
    minWidth: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  itemContainerSelected: {
    backgroundColor: 'orange',
  },
  itemTitle: {
    fontSize: 16,
  },
  itemTitleSelected: {
    fontWeight: 'bold',
  },
});
