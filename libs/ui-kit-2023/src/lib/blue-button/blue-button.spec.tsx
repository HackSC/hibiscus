import { render } from '@testing-library/react';

import BlueButton from './blue-button';

describe('BlueButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BlueButton label="    "/>);
    expect(baseElement).toBeTruthy();
  });
});
