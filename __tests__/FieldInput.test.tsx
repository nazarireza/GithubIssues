import React from 'react';
import renderer from 'react-test-renderer';
import { FieldInput } from '../src/components/molecules/FieldInput';
import { fireEvent, render } from 'react-native-testing-library'

describe('<FieldInput />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<FieldInput />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with title', () => {
    const tree = renderer.create(<FieldInput title="title1" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with error', () => {
    const tree = renderer
      .create(<FieldInput hasError errorMessages={['error1, error2']} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('fire the onChangeText', () => {
    const mockOnChangeText = jest.fn();
    const {getByTestId} = render(<FieldInput onChangeText={mockOnChangeText} />);

    const input = getByTestId('input');
    fireEvent(input, 'onChangeText', 'value1');

    expect(mockOnChangeText).toHaveBeenCalledWith('value1');
  })
});
