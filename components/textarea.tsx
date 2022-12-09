import styles from './textarea.module.scss';

type Props = {
  value?: string,
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>,
}

export default function Textarea({ value, onChange }: Props) {
  return (
    <textarea className={styles.textarea} onChange={onChange} value={value} />
  );
}
