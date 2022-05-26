import { NavigationContainer } from '@react-navigation/native';
import { RootStack } from './src/routes/RootStack';
import { Provider } from 'react-redux';
import store from './src/store';

// Set the locale once at the beginning of your app.
import './src/assets/dictionary';
import { useEffect } from 'react';
import { getConfigurations } from './src/store/slices/appSlice';

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
