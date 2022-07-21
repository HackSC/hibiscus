import { render } from '@testing-library/react';
import ImageSection from './imagesection';

describe('ImageSection', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ImageSection />);
    expect(baseElement).toBeTruthy();
  });
});
