// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import Document, { Head, Main, NextScript } from "next/document";
import { extractCritical } from "emotion-server";
import { injectGlobal } from "react-emotion";

injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
    background: #fafafa;
    font-family: -apple-system, system-ui, arial;
    font-weight: 400;
    color: #444;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  * {
    box-sizing: border-box;
  }

  #app {
    height: 100%;
  }
`;

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const page = ctx.renderPage();
    const initialProps = await Document.getInitialProps(ctx);
    const styles = extractCritical(page.html);

    return { ...page, ...styles, ...initialProps };
  }

  constructor(props) {
    super(props);
    const { __NEXT_DATA__, ids } = props;
    if (ids) {
      __NEXT_DATA__.ids = ids;
    }
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <style dangerouslySetInnerHTML={{ __html: this.props.css }} />
        </Head>
        <body className="body">
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
