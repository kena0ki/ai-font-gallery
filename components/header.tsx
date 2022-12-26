import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
import { PageProps } from '../pages/_app';
import styles from './header.module.scss';
import { LanguageContext, LANGUAGES } from './language-context';

type Props ={
  setLang: PageProps['setLang'],
}

export default function Header({ setLang }: Props) {
  const lang = useContext(LanguageContext);
  return (
    <header className={styles.header}>
      <Link href="/1st">
        <Image src="/logo.svg" height="64" width="64" alt="Logo" />
      </Link>
      <select value={lang} onChange={evt => setLang(evt.currentTarget.value)}>
        {
          LANGUAGES.map(l=> (
            <option key={l} value={l}>{l}</option>
          ))
        }
      </select>
      <a target="_blank" rel="noreferrer" href="https://github.com/kena0ki/ai-font-gallery">
        <Image className={styles.octocat} src="/octocat_ghost.svg" height="35" width="35" alt="Logo" />
      </a>
    </header>
  );
}
