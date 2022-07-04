import { render } from '@testing-library/react';

import TeamContactBlurbs from './team-contact-blurbs';

describe('TeamContactBlurbs', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TeamContactBlurbs />);
    expect(baseElement).toBeTruthy();
  });
});
