import { render } from '@testing-library/react';

import DesktopNavbar from './desktop-navbar';

describe('DesktopNavbar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DesktopNavbar />);
    expect(baseElement).toBeTruthy();
  });
});
