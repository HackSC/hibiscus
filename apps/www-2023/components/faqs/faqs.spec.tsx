import { render } from '@testing-library/react';

import FAQs from './faqs';

describe('FAQs', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FAQs />);
    expect(baseElement).toBeTruthy();
  });
});
