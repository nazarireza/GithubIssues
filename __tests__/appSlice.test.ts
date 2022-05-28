import { appSlice, setConfigurations } from '../src/store/slices/appSlice';

test('should return the initial state', () => {
  expect(appSlice.reducer(undefined, { type: 'ANY_ACTION' })).toEqual({
    isInit: false,
    organization: null,
    repository: null,
    isConfigured: false,
  });
});

test('should set the organization and repository', () => {
  expect(
    appSlice.reducer(
      undefined,
      setConfigurations({ organization: 'org1', repository: 'repo1' })
    )
  ).toEqual({
    organization: 'org1',
    repository: 'repo1',
    isConfigured: true,
    isInit: false,
  });
});
