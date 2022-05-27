import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { useTranslation } from '../assets/dictionary';
import { BookmarkedIssuesPage } from '../components/pages/BookmarkedIssuesPage';
import { ConfigurationPage } from '../components/pages/ConfigurationPage';
import { IssueDetailPage } from '../components/pages/IssueDetailPage';
import { IssuesPage } from '../components/pages/IssuesPage';
import { RootState } from '../store';
import { Routes } from './types';

const RootStackNavigator = createNativeStackNavigator();

export function RootStack() {
  const { t } = useTranslation();

  const { isInit, isConfigured } = useSelector((state: RootState) => state.app);
  if (!isInit) return <></>;

  return (
    <RootStackNavigator.Navigator
      initialRouteName={isConfigured ? Routes.Issues : Routes.Configuration}
    >
      <RootStackNavigator.Screen
        name={Routes.Configuration}
        component={ConfigurationPage}
        options={{
          title: t("Let's Start"),
        }}
      />
      <RootStackNavigator.Screen name={Routes.Issues} component={IssuesPage} />
      <RootStackNavigator.Screen
        name={Routes.BookmarkedIssues}
        component={BookmarkedIssuesPage}
        options={{
          title: t('Bookmarked Issues'),
        }}
      />
      <RootStackNavigator.Screen
        name={Routes.IssueDetail}
        component={IssueDetailPage}
      />
    </RootStackNavigator.Navigator>
  );
}
