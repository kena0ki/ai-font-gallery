import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
import { PageProps } from '../pages/_app';
import styles from './header.module.scss';
import { LanguageContext, LANGUAGES, LanguageUnion } from './language-context';
import Select from './select';

type Props ={
  changeLang: PageProps['changeLang'],
}

export default function Header({ changeLang }: Props) {
  const lang = useContext(LanguageContext);
  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <Link href="/1st">
          <Image src="/logo_wavy.svg" height="64" width="64" alt="Logo" />
        </Link>
      </div>
      <div className={styles.headerRight}>
        <Select className={styles.lang} value={lang} uisize="small"
          onChange={evt => changeLang(evt.currentTarget.value as LanguageUnion)}>
          {
            LANGUAGES.map(l=> (
              <option key={l} value={l}>{l.charAt(0)+l.charAt(1).toLowerCase()}</option>
            ))
          }
        </Select>
        <a target="_blank" rel="noreferrer" href="https://github.com/kena0ki/ai-font-gallery">
          <Image className={styles.octocat} src="/octocat_ghost.svg" height="35" width="35" alt="Logo" />
        </a>
      </div>
    </header>
  );
}
