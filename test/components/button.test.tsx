
import React from 'react';

import { Button } from '../../src/layouts/components/button';
import { MemoryRouter } from 'react-router-dom';
import TestRenderer from 'react-test-renderer';

describe('Button component', () => {
  it('should render button with children', () => {
    const testRenderer = TestRenderer.create(
      <Button type="button" onClick={() => {}}>
        Click me
      </Button>
    );
    const testInstance = testRenderer.root;

    expect(testInstance.findByType('button').props.children).toBe('Click me');
  });

  it('should call onClick when button is clicked', () => {
    const mockOnClick = jest.fn();
    const testRenderer = TestRenderer.create(
      <Button type="button" onClick={mockOnClick}>
        Click me
      </Button>
    );
    const testInstance = testRenderer.root;

    TestRenderer.act(() => {
      testInstance.findByType('button').props.onClick();
    });

    expect(mockOnClick).toHaveBeenCalled();
  });

  it('should render link with children when type is link', () => {
    const testRenderer = TestRenderer.create(
      <MemoryRouter>
        <Button type="link" route="/test">
          Go to test
        </Button>
      </MemoryRouter>
    );
    const testInstance = testRenderer.root;

    expect(testInstance.findByType('a').props.children).toBe('Go to test');
  });

  it('should render tooltip when button is disabled and disabledTooltip is provided', () => {
    const testRenderer = TestRenderer.create(
      <Button type="button" onClick={() => {}} disabled disabledTooltip="Disabled Tooltip">
        Click me
      </Button>
    );
    const testInstance = testRenderer.root;

    expect(testInstance.findByProps({ className: 'tooltip' }).children).toContain('Disabled Tooltip');
  });
});