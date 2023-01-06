import { GlobalStyles } from '@hibiscus/styles';
import Document from 'next/document';
import { ServerStyleSheet } from 'styled-components';

/**
 *  This is mandatory to get styled-components to run on SSR;
 *  without this you will see styled components default to no styles
 **/
export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            <GlobalStyles />
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
}
