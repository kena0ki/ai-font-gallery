import styles from './loader.module.scss';

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
  &{ message?: string, loading: boolean, width: string, height: string};

export default function Loader(props: Props) {
  return (
    <div className={`${styles.loaderBackground} ${!props.loading&&styles.off}`}>
      <div className={`${styles.loaderContainer} ${props.className}`}>
        <div>
          <svg x="0px" y="0px" style={{width:props.width, height:props.height}} viewBox="0 0 50 50" >
          <path d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
            <animateTransform attributeType="xml"
              attributeName="transform"
              type="rotate"
              from="0 25 25"
              to="360 25 25"
              dur="0.6s"
              repeatCount="indefinite"/>
            </path>
          </svg>
        </div>
        <div>
          <p>{props.message}</p>
        </div>
      </div>
    </div>
  );
}
