import { createAction, createSlice } from '@reduxjs/toolkit';
import { IssueDto } from '../../services/types';

interface BookmarkState {
  items: IssueDto[];
}

const initialState = {
  items: [],
} as BookmarkState;

export const bookmark = createAction<IssueDto>('bookmark');

export const unBookmark = createAction<IssueDto>('unBookmark');

export const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(bookmark, (state, action) => {
      state.items = [action.payload, ...state.items];
    });

    builder.addCase(unBookmark, (state, action) => {
      state.items = [
        ...state.items.filter((p) => p.number !== action.payload.number),
      ];
    });
  },
});
