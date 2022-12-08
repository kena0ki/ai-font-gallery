import styles from './button.module.scss';

type Props = {
  children?: React.ReactNode,
}

export const siteTitle = 'Next.js Sample Website';

export default function Layout({ children }: Props) {
  return (
    <button className={styles.button}>
      {children}
    </button>
  );
}
