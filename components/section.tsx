import styles from './section.module.scss';

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export default function Section(props: Props) {
  return (
    <div {...props} className={`${styles.section} ${props.className}`}></div>
  );
}
