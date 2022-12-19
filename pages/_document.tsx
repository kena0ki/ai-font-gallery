import { Html, Head, Main, NextScript } from 'next/document';
import { SITE_NAME } from '../utils/constants';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta property="og:image" content="https://github.com/kena0ki/ai-font-gallary/blob/main/public/logo_og.png" />
        <meta property="og:image:alt" content="Logo" />
        <meta name="og:title" content={SITE_NAME} />
        <meta name="description" content="Try few-shot font generation models" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
