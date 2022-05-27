import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AppState = {
  isInit: boolean;
  organization: string | null;
  repository: string | null;
  isConfigured: boolean;
};

const appInitialState: AppState = {
  isInit: false,
  organization: null,
  repository: null,
  isConfigured: false,
};

export const getConfigurations = createAsyncThunk(
  'getConfigurations',
  async () => {
    const organization = await AsyncStorage.getItem('organization');
    const repository = await AsyncStorage.getItem('repository');

    return { organization, repository };
  }
);

export const setConfigurations = createAction<{
  organization: string;
  repository: string;
}>('setConfigurations');

export const appSlice = createSlice({
  name: 'app',
  initialState: appInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getConfigurations.fulfilled, (state, action) => {
      state.organization = action.payload.organization;
      state.repository = action.payload.repository;
      state.isInit = true;
      state.isConfigured = action.payload.organization !== null;
    });

    builder.addCase(setConfigurations, (state, action) => {
      state.organization = action.payload.organization;
      state.repository = action.payload.repository;
      state.isConfigured = true;

      AsyncStorage.setItem('organization', action.payload.organization);
      AsyncStorage.setItem('repository', action.payload.repository);
    });
  },
});
