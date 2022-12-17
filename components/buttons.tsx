import styles from './buttons.module.scss';

type UiType = "primary"|"ghost";
type Size = "big"|"medium";
type Props = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>&{ uitype?: UiType, size?: Size };

export default function Button(p: Props) {
  const props = { ...p };
  const cls = [];
  cls.push(styles[props.uitype||"primary"]);
  cls.push(styles.button);
  cls.push(styles[props.size||"medium"]);
  if (props.disabled) cls.push(styles.disabled);
  if (props.className) cls.push(props.className);
  props.className = cls.join(" ");
  return (
    <button {...props}></button>
  );
}
