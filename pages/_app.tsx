import 'normalize.css';
//import '../styles/globals.css';
import '../styles/global.scss';
import type { AppProps } from 'next/app';
import { useCallback, useEffect, useState } from 'react';
import { INITIAL_FILES } from '../utils/constants';
import { registerServiceWorker } from '../utils/sw-registerer';
import { LanguageContext, LANGUAGES, LanguageUnion } from '../components/language-context';

registerServiceWorker();

export type PageProps = {
  files: (File|undefined)[],
  setFiles: React.Dispatch<React.SetStateAction<(File | undefined)[]>>,
  changeLang: (newLang: LanguageUnion) => void;
}

export default function App({ Component, pageProps }: AppProps) {
  const [files,setFiles] = useState<(File|undefined)[]>(INITIAL_FILES);
  const [lang,setLang] = useState<LanguageUnion>();
  const changeLang = useCallback((newLang: LanguageUnion) => {
    localStorage.setItem('lang',newLang);
    setLang(newLang);
  },[]);
  useEffect(() => {
    const navLang = navigator.language.slice(0,2)==='ja'? 'JA' : 'EN' ;
    const storedLang = (()=> {
      const l = localStorage.getItem('lang') as LanguageUnion; // This type cast might not be right but return type results in LanguageUnion
      return LANGUAGES.includes(l) ? l : 'EN';
    })();
    changeLang(lang||storedLang||navLang);
  },[lang,changeLang]);
  return (
    <LanguageContext.Provider value={lang||'EN'}>
      <Component {...pageProps} files={files} setFiles={setFiles} changeLang={changeLang} />
    </LanguageContext.Provider>
  );
}
