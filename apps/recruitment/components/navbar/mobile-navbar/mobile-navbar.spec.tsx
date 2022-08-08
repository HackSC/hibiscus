import { render } from '@testing-library/react';

import MobileNavbar from './mobile-navbar';

describe('MobileNavbar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MobileNavbar />);
    expect(baseElement).toBeTruthy();
  });
});
