import { NavigationContainer } from '@react-navigation/native';
import { RootStack } from './src/routes/RootStack';
import { Provider } from 'react-redux';
import store from './src/store';
import { useEffect } from 'react';
import { getConfigurations } from './src/store/slices/appSlice';

// Set the locale once at the beginning of your app.
import './src/assets/dictionary';

export default function App() {
  useEffect(() => {
    store.dispatch(getConfigurations());
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </Provider>
  );
}
