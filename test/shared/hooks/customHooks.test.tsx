
import React from 'react';

import ReactDOM from 'react-dom';

import { useOnMount } from '../../../src/modules/shared/app/hooks/customHooks';

const TestComponent = ({ onMount }) => {
  useOnMount(onMount);
  return null;
};

describe('useOnMount hook', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  it('should call onMount on mount', () => {
    const mockCallback = jest.fn();
    ReactDOM.render(<TestComponent onMount={mockCallback} />, container);
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
});