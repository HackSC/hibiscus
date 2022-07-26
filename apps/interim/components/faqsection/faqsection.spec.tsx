import { render } from '@testing-library/react';

import FAQSection from './faqsection';

describe('FAQSection', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FAQSection />);
    expect(baseElement).toBeTruthy();
  });
});
