import { useEffect } from 'react';

const useLoadGoogle = () => {
  function loadScript(src: string, position: HTMLElement | null, id: string) {
    if (!position) {
      return;
    }

    const script = document.createElement('script');
    script.setAttribute('async', '');
    script.setAttribute('id', id);
    script.src = src;
    position.appendChild(script);
  }

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const googleSignInScript = document.getElementById('google-signin-client');
    if (googleSignInScript) {
      googleSignInScript.remove();
    }

    loadScript(
      'https://accounts.google.com/gsi/client',
      document.querySelector('body'),
      'google-signin-client'
    );
  }, []);

  const GoogleCard = () => (
    <>
      <div
        id="g_id_onload"
        data-client_id="661231070007-ojm5n2oc64h55085frrrdcs5o4o43j7r.apps.googleusercontent.com"
        data-context="signin"
        data-ux_mode="popup"
        data-callback="handleSignInWithGoogle"
        data-auto_prompt="false"
        data-use_fedcm_for_prompt="true"
      ></div>

      <div
        className="g_id_signin"
        data-type="standard"
        data-shape="rectangular"
        data-theme="outline"
        data-text="signin_with"
        data-size="large"
        data-logo_alignment="left"
      ></div>
    </>
  );
  return GoogleCard;
};

export default useLoadGoogle;
