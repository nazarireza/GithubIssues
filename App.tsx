import { NavigationContainer } from '@react-navigation/native';
import { RootStack } from './src/routes/RootStack';

// Set the locale once at the beginning of your app.
import './src/assets/dictionary';

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
