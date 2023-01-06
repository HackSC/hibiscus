import { render } from '@testing-library/react';

import Speakers from './speakers';

describe('Speakers', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Speakers />);
    expect(baseElement).toBeTruthy();
  });
});
