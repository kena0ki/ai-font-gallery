import Button from './buttons';
import styles from './footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.leftMargin}></div>
      <div className={styles.signature}>
        {"Made by "}
        <a target="_blank" rel="noreferrer" href="https://github.com/kena0ki">
          <Button uitype="ghost">kena0ki</Button>
        </a>
      </div>
    </footer>
  );
}
