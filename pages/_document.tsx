import { Html, Head, Main, NextScript } from 'next/document';
import { SITE_NAME } from '../utils/constants';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/*<!-- Google tag (gtag.js) -->*/}
        <Script
          id="gtag"
          src="https://www.googletagmanager.com/gtag/js?id=G-QMV6SXSSSD"
          strategy="afterInteractive">
        </Script>
        <Script id="datalayer" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-QMV6SXSSSD');
          `}
        </Script>
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:image" content="https://raw.githubusercontent.com/kena0ki/ai-font-gallery/main/ogimage.png" />
        <meta property="og:image:alt" content="Logo" />
        <meta property="og:title" content={SITE_NAME} />
        <meta property="og:description" content="Try few-shot font generation models" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Yomogi&family=Yuji+Boku&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
