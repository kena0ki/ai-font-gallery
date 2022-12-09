import Image from 'next/image';
import Link from 'next/link';
import styles from './header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/1st">
        <Image src="/a_logo1.svg" height="64" width="64" alt="Logo" />
      </Link>
    </header>
  );
}
