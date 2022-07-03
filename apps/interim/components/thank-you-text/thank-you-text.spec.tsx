import { render } from '@testing-library/react';

import ThankYouText from './thank-you-text';

describe('ThankYouText', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ThankYouText nextYear={2023} />);
    expect(baseElement).toBeTruthy();
  });
});
