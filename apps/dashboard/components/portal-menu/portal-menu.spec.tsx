import { render } from '@testing-library/react';

import PortalMenu from './portal-menu';

describe('PortalMenu', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PortalMenu />);
    expect(baseElement).toBeTruthy();
  });
});
