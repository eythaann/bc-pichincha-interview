
import React from 'react';

import { Input } from '../../src/layouts/components/input';
import TestRenderer from 'react-test-renderer';

describe('Input component', () => {
  it('should render label, placeholder and error message', () => {
    const testRenderer = TestRenderer.create(
      <Input
        value=""
        label="Test Label"
        placeholder="Test Placeholder"
        error="Test Error"
        onChange={() => {}}
      />
    );
    const testInstance = testRenderer.root;

    expect(testInstance.findByProps({ className: 'labelText' }).children).toContain('Test Label');
    expect(testInstance.findByType('input').props.placeholder).toBe('Test Placeholder');
    expect(testInstance.findByProps({ className: 'errorMessage' }).children).toContain('Test Error');
  });

  it('should call onChange with new value when input value changes', () => {
    const mockOnChange = jest.fn();
    const testRenderer = TestRenderer.create(
      <Input
        value=""
        onChange={mockOnChange}
      />
    );
    const testInstance = testRenderer.root;

    // Simulate input change
    TestRenderer.act(() => {
      testInstance.findByType('input').props.onChange({ target: { value: 'New Value' } });
    });

    expect(mockOnChange).toHaveBeenCalledWith('New Value');
  });

  it('should not call onChange when input is disabled', () => {
    const mockOnChange = jest.fn();
    const testRenderer = TestRenderer.create(
      <Input
        value=""
        disabled
        onChange={mockOnChange}
      />
    );
    const testInstance = testRenderer.root;

    // Simulate input change
    TestRenderer.act(() => {
      testInstance.findByType('input').props.onChange({ target: { value: 'New Value' } });
    });

    expect(mockOnChange).not.toHaveBeenCalled();
  });
});