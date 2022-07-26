import { render } from '@testing-library/react';

import { H1, H2, H3, H4, H5, H6 } from './heading';

describe('Heading', () => {
  it('h1', () => {
    const { baseElement } = render(<H1 />);
    expect(baseElement).toBeTruthy();
  });
  it('h2', () => {
    const { baseElement } = render(<H2 />);
    expect(baseElement).toBeTruthy();
  });
  it('h3', () => {
    const { baseElement } = render(<H3 />);
    expect(baseElement).toBeTruthy();
  });
  it('h4', () => {
    const { baseElement } = render(<H4 />);
    expect(baseElement).toBeTruthy();
  });
  it('h5', () => {
    const { baseElement } = render(<H5 />);
    expect(baseElement).toBeTruthy();
  });
  it('h6', () => {
    const { baseElement } = render(<H6 />);
    expect(baseElement).toBeTruthy();
  });
});
