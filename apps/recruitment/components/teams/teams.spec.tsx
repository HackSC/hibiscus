import { render } from '@testing-library/react';

import Teams from './teams';

describe('Teams', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Teams />);
    expect(baseElement).toBeTruthy();
  });
});
