/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.svg' {
  const content: any;
  export const ReactComponent: any;
  export default content;
}


export { };

declare global {
  interface Window {
    handleSignInWithGoogle: (response: any) => void;
  }
}
