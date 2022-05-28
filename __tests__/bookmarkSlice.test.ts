import { IssueDto } from '../src/services/types';
import {
  bookmark,
  bookmarkSlice,
  unBookmark,
} from '../src/store/slices/bookmarkSlice';

test('should return the initial state', () => {
  expect(bookmarkSlice.reducer(undefined, { type: 'ANY_ACTION' })).toEqual({
    items: [],
  });
});

const item1: IssueDto = {
  number: 1234,
  title: 'title1',
  body: '##body1',
  created_at: '2020-01-01',
  state: 'open',
};

const item2: IssueDto = {
  number: 4321,
  title: 'title2',
  body: '##body2',
  created_at: '2020-01-01',
  state: 'closed',
};

test('should add the bookmarked item to empty state (bookmark)', () => {
  expect(bookmarkSlice.reducer({ items: [] }, bookmark(item1))).toEqual({
    items: [item1],
  });
});

test('should add the bookmarked item to state (bookmark)', () => {
  expect(bookmarkSlice.reducer({ items: [item2] }, bookmark(item1))).toEqual({
    items: [item1, item2],
  });
});

test('should remove the bookmarked item from single item state (unBookmark)', () => {
  expect(bookmarkSlice.reducer({ items: [item2] }, unBookmark(item2))).toEqual({
    items: [],
  });
});

test('should remove the bookmarked item from state (unBookmark)', () => {
  expect(
    bookmarkSlice.reducer({ items: [item1, item2] }, unBookmark(item2))
  ).toEqual({
    items: [item1],
  });
});
