import React, { useRef } from 'react';
import Image from 'next/image';
import styles from './upload-single.module.scss';
import { setBorderStyle, onDragOver, onDragLeave } from './upload-multiple';
import type { HandleFile } from '../pages/2nd';
import { NUM_STYLES } from '../utils/constants';

type Props = {
  files: (File|undefined)[],
  handleFile: HandleFile,
  className?: string,
}

export default function UploadSingle({ files, handleFile, className }: Props) {
  const refInput = useRef<HTMLInputElement>(null);
  const refIdx = useRef<number|null>(null);
  return <div className={className} >
    <div className={styles.container}>
      <input type="file" className={styles.input} ref={refInput}
        onChange={evt => {
          const fileList = evt.currentTarget.files??(new FileList());
          const idx = refIdx.current!; // eslint-disable-line @typescript-eslint/no-non-null-assertion
          handleFile(idx,fileList);
        }}
      />
      {[...Array(NUM_STYLES).keys()].map(idx => {
        const file = files[idx];
        const clsName = file ? styles.image : styles.noImage;
        const objUrl = file&&URL.createObjectURL(file);
        return (
          <div key={`${idx}-${objUrl}`}
            className={clsName}
            onClick={() => {
              refIdx.current = idx;
              refInput.current?.click?.();
            }}
            onDrop={evt => {
              evt.preventDefault();
              console.log(idx,evt.dataTransfer.files);
              handleFile(idx,evt.dataTransfer.files);
              setBorderStyle(evt.currentTarget,"");
            }}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
          >
            {objUrl
              ?<Image src={objUrl} alt="font image" width="100" height="100" />
              :<p className={styles.noImageText}>No Image</p>
            }
          </div>
        );
      })}
    </div>
  </div>;
}
