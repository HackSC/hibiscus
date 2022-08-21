import { render } from '@testing-library/react';

import StudentXP from './studentxp';

describe('StudentXP', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StudentXP />);
    expect(baseElement).toBeTruthy();
  });
});
