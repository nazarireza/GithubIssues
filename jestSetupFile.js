import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import { fetch } from 'cross-fetch';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('@expo/vector-icons/MaterialCommunityIcons', () => 'Icon');

global.fetch = fetch;
