import '@fontsource/inter/400.css';
import '@fontsource/inter/variable.css'; // Contains ONLY variable weights and no other axes.
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
body {
  font-family: Inter,-apple-system,BlinkMacSystemFont,Helvetica,Arial,sans-serif;
  margin: 0;
  padding: 0;
}

@supports (font-variation-settings: normal) {
  body {
    font-family: InterVariable,-apple-system,BlinkMacSystemFont,Helvetica,Arial,sans-serif;
  }
}
`;

export const GlobalStyles2023 = createGlobalStyle`
body {
  font-family: Inter,-apple-system,BlinkMacSystemFont,Helvetica,Arial,sans-serif;
  background: black;
  color: white;
  margin: 0;
  padding: 0;
}

@supports (font-variation-settings: normal) {
  body {
    font-family: InterVariable,-apple-system,BlinkMacSystemFont,Helvetica,Arial,sans-serif;
  }
}
`;
