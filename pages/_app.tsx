import 'normalize.css';
//import '../styles/globals.css';
import '../styles/global.scss';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import { INITIAL_FILES } from '../utils/constants';
import { registerServiceWorker } from '../utils/sw-registerer';
import { INI_LANG, LanguageContext, LanguageUnion } from '../components/language-context';

registerServiceWorker();

export type PageProps = {
  files: (File|undefined)[],
  setFiles: React.Dispatch<React.SetStateAction<(File | undefined)[]>>,
  setLang: React.Dispatch<React.SetStateAction<string>>,
}

export default function App({ Component, pageProps }: AppProps) {
  const [files,setFiles] = useState<(File|undefined)[]>(INITIAL_FILES);
  const [lang,setLang] = useState<LanguageUnion>(INI_LANG);
  return (
    <LanguageContext.Provider value={lang}>
      <Component {...pageProps} files={files} setFiles={setFiles} setLang={setLang} />;
    </LanguageContext.Provider>
  );
}
