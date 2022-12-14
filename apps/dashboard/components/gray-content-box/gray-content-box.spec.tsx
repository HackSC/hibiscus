import { render } from '@testing-library/react';

import GrayContentBox from './gray-content-box';

describe('GrayContentBox', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GrayContentBox />);
    expect(baseElement).toBeTruthy();
  });
});
