import { render } from '@testing-library/react';

import SidebarNav from './navbar';

describe('Navbar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SidebarNav />);
    expect(baseElement).toBeTruthy();
  });
});
