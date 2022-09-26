import { render } from '@testing-library/react';

import SomeComponentLol from './some-component-lol';

describe('SomeComponentLol', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SomeComponentLol />);
    expect(baseElement).toBeTruthy();
  });
});
