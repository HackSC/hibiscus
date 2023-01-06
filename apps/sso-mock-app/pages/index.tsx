import { Button } from '@hibiscus/ui-kit-2023';
import { logout } from '@hibiscus/sso-client';

export function Index() {
  return (
    <>
      <h1>Hi</h1>
      <Button color="black" onClick={logout}>
        Logout
      </Button>
    </>
  );
}

export default Index;
