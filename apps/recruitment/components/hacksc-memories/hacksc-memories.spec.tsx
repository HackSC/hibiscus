import { render } from '@testing-library/react';

import HackSCMemories from './hacksc-memories';

describe('HackSCMemories', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HackSCMemories />);
    expect(baseElement).toBeTruthy();
  });
});
