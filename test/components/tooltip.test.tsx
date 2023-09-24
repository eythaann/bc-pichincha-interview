import React from 'react';

import { Tooltip } from '../../src/layouts/components/tooltip';
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

  it('should show tooltip text on mouse enter', () => {
    const testRenderer = TestRenderer.create(
      <Tooltip text="Tooltip Text">
        <button>Hover me</button>
      </Tooltip>
    );
    const testInstance = testRenderer.root;

    TestRenderer.act(() => {
      testInstance.findByType('div').props.onMouseEnter({ currentTarget: { getBoundingClientRect: () => ({ top: 0, left: 0, width: 0 }) } });
    });

    expect(testInstance.findAllByProps({ className: 'tooltip' })[0].children).toContain('Tooltip Text');
  });

  it('should hide tooltip text on mouse leave', () => {
    const testRenderer = TestRenderer.create(
      <Tooltip text="Tooltip Text">
        <button>Hover me</button>
      </Tooltip>
    );
    const testInstance = testRenderer.root;

    TestRenderer.act(() => {
      testInstance.findByType('div').props.onMouseEnter({ currentTarget: { getBoundingClientRect: () => ({ top: 0, left: 0, width: 0 }) } });
    });

    expect(testInstance.findAllByProps({ className: 'tooltip' }).length).toBe(1);

    TestRenderer.act(() => {
      testInstance.findByType('div').props.onMouseLeave();
    });

    expect(testInstance.findAllByProps({ className: 'tooltip' }).length).toBe(0);
  });
});