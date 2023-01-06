import { render } from '@testing-library/react';

import Topic from './topic';

describe('Topic', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Topic />);
    expect(baseElement).toBeTruthy();
  });
});
