import { Html, Head, Main, NextScript } from 'next/document';
import { SITE_NAME } from '../utils/constants';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="twitter:card" content="summary" />
        <meta property="og:image" content="https://raw.githubusercontent.com/kena0ki/ai-font-gallery/main/public/logo_og.png" />
        <meta property="og:image:alt" content="Logo" />
        <meta property="og:title" content={SITE_NAME} />
        <meta property="og:description" content="Try few-shot font generation models" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Yuji+Boku&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
