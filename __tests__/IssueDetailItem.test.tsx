import React from 'react';
import renderer from 'react-test-renderer';
import { fireEvent, render } from 'react-native-testing-library';
import { IssueDetailItem } from '../src/components/molecules/IssueDetailItem';
import { IssueDto } from '../src/services/types';

const item: IssueDto = {
  number: 1234,
  title: 'title1',
  body: '##body1',
  created_at: '2020-01-01',
  state: 'open',
};

describe('<IssueDetailItem />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<IssueDetailItem item={item} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('fire the onToggleBookmark', () => {
    const mockOnToggleBookmark = jest.fn();
    const { getByTestId } = render(
      <IssueDetailItem item={item} onToggleBookmark={mockOnToggleBookmark} />
    );

    const button = getByTestId('bookmark');
    fireEvent(button, 'onPress');

    expect(mockOnToggleBookmark).toHaveBeenCalledTimes(1);
  });
});
