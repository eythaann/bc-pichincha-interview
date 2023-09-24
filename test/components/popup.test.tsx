import React from 'react';

import { Popup } from '../../src/layouts/components/popup';
import TestRenderer from 'react-test-renderer';

describe('Popup component', () => {
  it('should render trigger and children', () => {
    const testRenderer = TestRenderer.create(
      <Popup trigger={<button>Open Popup</button>}>
        <div>Popup Content</div>
      </Popup>
    );
    const testInstance = testRenderer.root;

    expect(testInstance.findByType('button').props.children).toBe('Open Popup');
    expect(testInstance.findByType('div').children).toContain('Popup Content');
  });

  it('should toggle open state on trigger click', () => {
    const testRenderer = TestRenderer.create(
      <Popup trigger={<button>Open Popup</button>}>
        <div>Popup Content</div>
      </Popup>
    );
    const testInstance = testRenderer.root;

    // Initially, popup should be closed
    expect(testInstance.findAllByProps({ className: 'popup open' }).length).toBe(0);

    // Simulate trigger click to open popup
    TestRenderer.act(() => {
      testInstance.findByType('button').props.onClick();
    });

    // Now, popup should be open
    expect(testInstance.findAllByProps({ className: 'popup open' }).length).toBe(1);

    // Simulate trigger click to close popup
    TestRenderer.act(() => {
      testInstance.findByType('button').props.onClick();
    });

    // Now, popup should be closed again
    expect(testInstance.findAllByProps({ className: 'popup open' }).length).toBe(0);
  });
});