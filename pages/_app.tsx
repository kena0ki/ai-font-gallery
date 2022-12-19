import 'normalize.css';
//import '../styles/globals.css';
import '../styles/global.scss';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import { INITIAL_FILES } from '../utils/constants';

export type PageProps = {
  files: (File|undefined)[],
  setFiles: React.Dispatch<React.SetStateAction<(File | undefined)[]>>,
}

export default function App({ Component, pageProps }: AppProps) {
  const [files,setFiles] = useState<(File|undefined)[]>(INITIAL_FILES);
  return <Component {...pageProps} files={files} setFiles={setFiles} />;
}
