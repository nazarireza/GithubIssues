import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Constants from 'expo-constants';
import { GetIssueModel, IssueDto } from './types';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: Constants.manifest?.extra?.baseUrl,
  }),

  endpoints: (build) => ({
    getIssues: build.query<IssueDto[], GetIssueModel>({
      query: ({
        state = 'open',
        page = 0,
        per_page = 10,
        organization,
        repository,
      }) => ({
        url: `/repos/${organization}/${repository}/issues?state=${state}&page=${page}&per_page=${per_page}`,
      }),
    }),
  }),
});

export const { useLazyGetIssuesQuery } = api;
