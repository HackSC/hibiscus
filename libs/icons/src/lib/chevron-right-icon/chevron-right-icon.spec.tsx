import { render } from '@testing-library/react';

import ChevronRightIcon from './chevron-right-icon';

describe('ChevronRightIcon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChevronRightIcon />);
    expect(baseElement).toBeTruthy();
  });
});
