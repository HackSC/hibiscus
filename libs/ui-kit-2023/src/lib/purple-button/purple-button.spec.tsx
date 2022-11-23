import { render } from '@testing-library/react';

import PurpleButton from './purple-button';

describe('PurpleButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PurpleButton label="    " />);
    expect(baseElement).toBeTruthy();
  });
});
