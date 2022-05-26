import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BookmarkedIssuesPage } from '../components/pages/BookmarkedIssuesPage';
import { ConfigurationPage } from '../components/pages/ConfigurationPage';
import { IssueDetailPage } from '../components/pages/IssueDetailPage';
import { IssuesPage } from '../components/pages/IssuesPage';
import { Routes } from './types';

const RootStackNavigator = createNativeStackNavigator();

export function RootStack() {
  return (
    <RootStackNavigator.Navigator>
      <RootStackNavigator.Screen
        name={Routes.Configuration}
        component={ConfigurationPage}
      />
      <RootStackNavigator.Screen name={Routes.Issues} component={IssuesPage} />
      <RootStackNavigator.Screen
        name={Routes.BookmarkedIssues}
        component={BookmarkedIssuesPage}
      />
      <RootStackNavigator.Screen
        name={Routes.IssueDetail}
        component={IssueDetailPage}
      />
    </RootStackNavigator.Navigator>
  );
}
