import styles from './select.module.scss';

type Size = "small"|"medium";
type Props = React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>&{ uisize?: Size };

export default function Select(p: Props) {
  const props = { ...p };
  const cls = [];
  cls.push(styles.select);
  cls.push(styles[props.uisize||"medium"]);
  if (props.className) cls.push(props.className);
  props.className = cls.join(" ");
  return (
    <select {...props}></select>
  );
}
