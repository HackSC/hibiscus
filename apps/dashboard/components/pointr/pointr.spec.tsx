import { render } from '@testing-library/react';

import Pointr from './pointr';

describe('Pointr', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Pointr />);
    expect(baseElement).toBeTruthy();
  });
});
