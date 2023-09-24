
import React from 'react';

import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';

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

  it('should call onMount on mount', async () => { // Marca la función de prueba como async
    const mockCallback = jest.fn();

    await act(async () => { // Utiliza act y una función async
      createRoot(container).render(<TestComponent onMount={mockCallback} />);
    });

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
});