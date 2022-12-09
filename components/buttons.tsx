import styles from './buttons.module.scss';

type Props = {
  children?: React.ReactNode,
  onClick?: React.MouseEventHandler<HTMLButtonElement>,
}

export default function PrimaryButton({ children, onClick }: Props) {
  return (
    <button className={styles.primaryButton} onClick={onClick} >
      {children}
    </button>
  );
}

export function GhostButton({ children, onClick }: Props) {
  return (
    <button className={styles.ghostButton} onClick={onClick} >
      {children}
    </button>
  );
}
