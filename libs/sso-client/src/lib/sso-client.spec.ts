import { ssoClient } from './sso-client';

describe('ssoClient', () => {
  it('should work', () => {
    expect(ssoClient()).toEqual('sso-client');
  });
});
