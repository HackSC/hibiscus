import { render } from '@testing-library/react';

import EmailNewsletterInputSection from './email-newsletter-input-section';

describe('EmailNewsletterInputSection', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EmailNewsletterInputSection />);
    expect(baseElement).toBeTruthy();
  });
});
