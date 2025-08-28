import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';

import Button from '../Button';

describe('Button Component', () => {
  it('renders correctly with title', () => {
    const { getByText } = render(
      <Button title="Test Button" onPress={() => {}} />
    );
    
    expect(getByText('Test Button')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <Button title="Test Button" onPress={mockOnPress} />
    );
    
    fireEvent.press(getByText('Test Button'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('shows loading state when loading prop is true', () => {
    const { getByTestId } = render(
      <Button title="Test Button" onPress={() => {}} loading={true} />
    );
    
    // Loading indicator should be visible
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });
});
