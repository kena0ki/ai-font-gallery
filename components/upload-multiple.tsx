import styles from './upload-multiple.module.scss';
import React, { useRef } from 'react';
import { HandleFiles } from '../pages/2nd';

type Props = {
  handleFiles: HandleFiles,
  className?: string,
}

export const setBorderStyle = (target:EventTarget, style: string) => {
  if (! (target instanceof HTMLElement)) return;
  target.style.borderStyle = style;
};

export const onDragOver = (evt:React.DragEvent<HTMLElement>) => {
  evt.preventDefault();
  setBorderStyle(evt.currentTarget,"solid");
};

export const onDragLeave = (evt:React.DragEvent<HTMLElement>) => {
  evt.preventDefault();
  setBorderStyle(evt.currentTarget,"");
};

const texts = {
  instruction:`生成元画像をここにアップロードしてください`,
};

export default function UploadMultiple({ handleFiles, className }: Props) {
  const ref = useRef<HTMLInputElement>(null);
  const { instruction } = texts;
  return <div className={className} >
    <input type="file" multiple className={styles.input} ref={ref}
      onChange={evt => handleFiles(evt.currentTarget.files??(new FileList()))} />
    <div className={styles.uploadArea}
      onClick={() => ref.current?.click?.()}
      onDrop={evt => {
        handleFiles(evt.dataTransfer.files);
        evt.preventDefault();
        setBorderStyle(evt.currentTarget,"");
      }}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onPaste={evt => handleFiles(evt.clipboardData.files)}
    >
      <p className={styles.instruction}>{instruction}</p>
    </div>
  </div>;
}
