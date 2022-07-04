import { render } from '@testing-library/react';

import LogoAndSloganSection from './logo-and-slogan';

describe('LogoAndSlogan', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LogoAndSloganSection />);
    expect(baseElement).toBeTruthy();
  });
});
