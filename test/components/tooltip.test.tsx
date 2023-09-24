import React from 'react';

import { Tooltip } from '../../src/layouts/components/tooltip';
import { fireEvent, render } from '@testing-library/react';
import TestRenderer from 'react-test-renderer';

describe('Tooltip component', () => {
  it('should render children', () => {
    const testRenderer = TestRenderer.create(
      <Tooltip text="Tooltip Text">
        <button>Hover me</button>
      </Tooltip>
    );
    const testInstance = testRenderer.root;

    expect(testInstance.findByType('button').props.children).toBe('Hover me');
  });

  it('should hide tooltip text on mouse leave', () => {
    const { getByRole, queryByRole } = render(
      <Tooltip text="Tooltip Text">
        <button>Hover me</button>
      </Tooltip>
    );

    fireEvent.mouseEnter(getByRole('button'));
    expect(queryByRole('tooltip')).toBeInTheDocument();

    fireEvent.mouseLeave(getByRole('button'));
    expect(queryByRole('tooltip')).not.toBeInTheDocument();
  });
});

