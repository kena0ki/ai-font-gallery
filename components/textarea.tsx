import styles from './textarea.module.scss';

type Props = React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;

export default function Textarea(props: Props) {
  return (
    <textarea {...props} className={`${styles.textarea} ${props.className}`}/>
  );
}
