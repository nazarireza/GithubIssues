import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Constants from 'expo-constants';
import { GetIssueModel, GetSingleIssueModel, IssueDto } from './types';

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

    getSingleIssue: build.query<IssueDto, GetSingleIssueModel>({
      query: ({ organization, repository, issueNumber }) => ({
        url: `/repos/${organization}/${repository}/issues/${issueNumber}`,
      }),
    }),
  }),
});

export const { useLazyGetIssuesQuery, useGetSingleIssueQuery } = api;
