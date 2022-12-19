import Image from 'next/image';
import Link from 'next/link';
import styles from './header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/1st">
        <Image src="/logo.svg" height="64" width="64" alt="Logo" />
      </Link>
      <a target="_blank" rel="noreferrer" href="https://github.com/kena0ki/ai-font-demo">
        <Image className={styles.octocat} src="/octocat_ghost.svg" height="35" width="35" alt="Logo" />
      </a>
    </header>
  );
}
