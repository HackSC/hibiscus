import { render } from '@testing-library/react';

import OTPInput from './otp-input';

describe('LoginCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <OTPInput
        setPinReady={undefined}
        code={undefined}
        setCode={undefined}
        maxLength={undefined}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
