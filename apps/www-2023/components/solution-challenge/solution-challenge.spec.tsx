import { render } from '@testing-library/react';

import SolutionChallenge from './solution-challenge';

describe('SolutionChallenge', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SolutionChallenge />);
    expect(baseElement).toBeTruthy();
  });
});
