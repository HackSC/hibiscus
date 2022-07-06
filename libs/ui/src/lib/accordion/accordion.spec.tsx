import { render } from '@testing-library/react';

import AccordionItem from './accordion';

describe('ToggleListItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AccordionItem />);
    expect(baseElement).toBeTruthy();
  });
});
