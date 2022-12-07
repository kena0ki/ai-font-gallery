import Head from 'next/head';
import Image from 'next/image';
import styles from './button.module.scss';
import Link from 'next/link';

type Props = {
  children?: React.ReactNode
}

export const siteTitle = 'Next.js Sample Website';

export default function Layout({ children }: Props) {
  return (
    <button className={styles.button}>
      {children}
    </button>
  );
}
