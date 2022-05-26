import { configureStore } from '@reduxjs/toolkit';
import { api } from '../services/api';
import { appSlice } from './slices/appSlice';

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    app: appSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
