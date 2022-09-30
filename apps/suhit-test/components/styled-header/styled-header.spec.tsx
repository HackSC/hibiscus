import { render } from '@testing-library/react';

import StyledHeader from './styled-header';

describe('StyledHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StyledHeader />);
    expect(baseElement).toBeTruthy();
  });
});
