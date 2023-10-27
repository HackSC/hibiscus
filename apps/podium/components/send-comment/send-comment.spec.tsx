import { render } from '@testing-library/react';

import SendComment from './send-comment';

describe('SendComment', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SendComment />);
    expect(baseElement).toBeTruthy();
  });
});
