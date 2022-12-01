import { render } from '@testing-library/react';

import UiKit2023 from './ui-kit-2023';

describe('UiKit2023', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiKit2023 />);
    expect(baseElement).toBeTruthy();
  });
});
