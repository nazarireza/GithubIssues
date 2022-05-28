import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { RootStack } from '../src/routes/RootStack';
import store from '../src/store';
import fetchMock from 'jest-fetch-mock';

beforeEach((): void => {
  fetchMock.resetMocks();
});

describe('<App />', () => {
  it('renders correctly', () => {
    fetchMock.mockResponse(JSON.stringify({}));

    const tree = renderer
      .create(
        <Provider store={store}>
          <RootStack />
        </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
