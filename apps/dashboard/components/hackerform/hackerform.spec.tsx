import { render } from '@testing-library/react';

import Hackerform from './hackerform';

describe('Hackerform', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Hackerform />);
    expect(baseElement).toBeTruthy();
  });
});
