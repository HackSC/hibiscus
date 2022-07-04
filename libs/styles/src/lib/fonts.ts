import '@fontsource/inter/400.css';
import '@fontsource/inter/variable.css'; // Contains ONLY variable weights and no other axes.
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
body {
  font-family: Inter, sans-serif;
}

@supports (font-variation-settings: normal) {
  body {
    font-family: InterVariable;
  }
}
`;
