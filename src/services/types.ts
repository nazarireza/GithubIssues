export type IssueState = 'open' | 'closed' | 'all';

export type IssueDto = {
  number: number;
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

export type GetSingleIssueModel = {
  organization: string;
  repository: string;
  issueNumber: number;
};
