import { render } from '@testing-library/react';

import ThankYouText from './thank-you-text';

describe('ThankYouText', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ThankYouText />);
    expect(baseElement).toBeTruthy();
  });
});
