import styles from './2nd.module.scss';
import Layout from '../components/layout';
import Button, { GhostButton } from '../components/buttons';
import React, { useState } from 'react';
import UploadSingle from '../components/upload-single';
import UploadMultiple from '../components/upload-multiple';

export type HandleFiles = (fileList:FileList) => void;
export type HandleFile = (idx:number,fileList:FileList) => void;

const texts = {
  note:`学習済みデータの都合上、生成元画像はローマ字の方が精度が高くなります。`,
};

const INITIAL_FILES=[...Array(6)];

export default function Second() {

  const [files, setFiles] = useState<(File|undefined)[]>(INITIAL_FILES);
  const {note} = texts;
  const handleFiles:HandleFiles = (fileList) => {
    console.log(fileList);
    setFiles([...fileList, ...files.slice(fileList.length)]);
  };
  const handleFile:HandleFile = (idx,fileList) => {
    const newFiles = [...files.slice(0,idx) ,fileList[0] ,...files.slice(idx+1)];
    console.log(newFiles);
    setFiles(newFiles);
  };
  const isMult = files.every(v=>v===undefined);

  return (
    <Layout>
      <div className={styles.menu}>
        {isMult
          ?<GhostButton >Example</GhostButton>
          :<GhostButton onClick={()=>setFiles(INITIAL_FILES)}>Clear</GhostButton>
        }
      </div>
      {isMult
        ?<UploadMultiple handleFiles={handleFiles} />
        :<UploadSingle files={files} handleFile={handleFile} />
      }
      <div className={styles.note}>{note}</div>
      <div className={styles.button}>
        <Button>Done!</Button>
      </div>
    </Layout>
  );
}
