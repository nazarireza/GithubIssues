export type IssueState = 'open' | 'closed';

export type IssueDto = {
  id: number;
  title: string;
  body: string;
  state: IssueState;
  created_at: string;
};

export type GetIssueModel = {
  organization: string;
  repository: string;
  page?: number;
  per_page?: number;
  state?: IssueState;
};
