import Link from 'next/link';
import styles from './2nd.module.scss';
import Layout from '../components/layout';
import Button from '../components/buttons';
import UploadSingle from '../components/upload-single';
import UploadMultiple from '../components/upload-multiple';
import { EXAMPLE_FONTS, INITIAL_FILES, NUM_STYLES } from '../utils/constants';
import { PageProps } from './_app';
import { shuffle, toFileChar } from '../utils/utils';

export type HandleFiles = (fileList:FileList) => void;
export type HandleFile = (idx:number,fileList:FileList) => void;

const texts = {
  note:`枚数は${NUM_STYLES}枚、文字はローマ字（A-Z,a-z）のフォント画像をアップロードしてください`,
};

export default function Second({files,setFiles}:PageProps) {
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
  const handleExample = async () => {
    const shuffled = shuffle([...Array(52).keys()]);
    const chrs = shuffled
      .map(v=> {
        const cp = v<=25 ? v+65 : v-26+97;
        const chr = String.fromCodePoint(cp);
        return toFileChar(chr);
      })
      .slice(0,NUM_STYLES);
    const exFont = shuffle(EXAMPLE_FONTS)[0];
    const exFilePromises = chrs.map(async v => {
      const url = `/example-fonts/${exFont}/${v}.png`;
      const res = await fetch(url);
      const buf = await res.arrayBuffer();
      return new File([buf], v);
    });
    const exFiles = await Promise.all(exFilePromises);
    setFiles(exFiles);
  };
  const isMult = files.every(v=>v===undefined);
  const done = files.every(v=>v);
  return (
    <Layout>
      <div className={styles.menu}>
        {isMult
          ?<Button uitype="ghost" onClick={handleExample} >Example</Button>
          :<Button uitype="ghost" onClick={()=>setFiles(INITIAL_FILES)}>Clear</Button>
        }
      </div>
      {isMult
        ?<UploadMultiple className={styles.multipleUploadArea} handleFiles={handleFiles} />
        :<UploadSingle files={files} handleFile={handleFile} />
      }
      <div className={styles.note}>{note}</div>
      <div className={styles.button}>
        {done?
          <Link href="/3rd">
            <Button size="big">Done!</Button>
          </Link>
          :
          <Button size="big" disabled >Done!</Button>
        }
      </div>
    </Layout>
  );
}
