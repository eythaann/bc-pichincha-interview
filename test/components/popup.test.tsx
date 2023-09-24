import React from 'react';

import { Popup } from '../../src/layouts/components/popup';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Popup component', () => {
  it('should toggle open state on trigger click and close on click outside', () => {
    const { getByTestId, queryByRole } = render(
      <div>
        <Popup trigger={<div data-testid="trigger">Open Popup</div>}>
          <div>Popup Content</div>
        </Popup>
        <div data-testid="outside-element"></div>
      </div>
    );

    expect(queryByRole('menu')).not.toBeInTheDocument();

    fireEvent.click(getByTestId('trigger'));
    expect(queryByRole('menu')).toBeInTheDocument();

    fireEvent.mouseDown(getByTestId('trigger'));
    expect(queryByRole('menu')).not.toBeInTheDocument();

    fireEvent.click(getByTestId('trigger'));
    expect(queryByRole('menu')).toBeInTheDocument();

    fireEvent.mouseDown(getByTestId('outside-element'));
    expect(queryByRole('menu')).not.toBeInTheDocument();
  });
});