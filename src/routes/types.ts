import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export enum Routes {
  Configuration = 'configuration',
  Issues = 'issues',
  IssueDetail = 'issue_detail',
  BookmarkedIssues = 'bookmarked_issues',
}

export type RootStackParamList = {
  [Routes.Configuration]: undefined;
  [Routes.Issues]: undefined;
  [Routes.BookmarkedIssues]: undefined;
  [Routes.IssueDetail]: {
    issueNumber: number;
  };
};

export type RootStackComponent<RouteName extends keyof RootStackParamList> =
  React.FC<{
    navigation: NativeStackNavigationProp<RootStackParamList, RouteName>;
    route: RouteProp<RootStackParamList, RouteName>;
  }>;
