import { render } from '@testing-library/react';

import HackerManager from './hacker-manager';

describe('HackerManager', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HackerManager />);
    expect(baseElement).toBeTruthy();
  });
});
