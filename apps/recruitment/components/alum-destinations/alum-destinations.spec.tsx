import { render } from '@testing-library/react';

import AlumDestinations from './alum-destinations';

describe('AlumDestinations', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AlumDestinations />);
    expect(baseElement).toBeTruthy();
  });
});
