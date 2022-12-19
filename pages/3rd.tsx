import styles from './3rd.module.scss';
import Layout from '../components/layout';
import Button from '../components/buttons';
import Textarea from '../components/textarea';
import Section from '../components/section';
import { PageProps } from './_app';
import { BATCH_SIZE, IMAGE_HEIGHT, IMAGE_WIDTH, MEAN, NUM_CHANNEL, NUM_CHANNEL_GREY, STD } from '../util/constants';
import { InferenceSession, Tensor } from 'onnxruntime-web';
import { potrace, init as potraceInit } from '../node_modules/esm-potrace-wasm/dist/index.js'; // tomayac/esm-potrace-wasm#13
import * as ReactDOMServer from 'react-dom/server';
import SvgFontTemplate from '../components/svg-font-template';
import svg2ttfBuf from '../util/svg2ttfBuf';
import { useState } from 'react';
import { toFileChar } from '../util/utils';
import Loader from '../components/loader';

const MYFONT = "myfont";

export default function Third({files}:PageProps) {

  const [inpStr, setInpStr] = useState('あヲ花鳥風月万丈');
  const [myFontFace, setMyFontFace] = useState<FontFace|null>(null);
  const [progress, setProgress] = useState<number|null>(null);

  const instruction = `ここに何か入力してください`;
  const onSubmit = async () => {
    setProgress(0);
    const glyphPromises = [...inpStr].map(chr => toGlyph(files as File[],chr, setProgress));
    const glyphs = await Promise.all(glyphPromises);
    const svgElm = SvgFontTemplate({ fontName:MYFONT, glyphs });
    const svgFont$ = ReactDOMServer.renderToStaticMarkup(svgElm);
    const svgFont = svgFont$.replaceAll("&amp;","&"); // since "&" is sanitized by the renderToStaticMarkup method.
    console.log(svgFont);
    const ttfBuf = svg2ttfBuf(svgFont);
    console.log(ttfBuf);
    const fontFace = new FontFace(MYFONT, ttfBuf);
    fontFace.load();
    if (myFontFace) document.fonts.delete(myFontFace);
    document.fonts.add(fontFace);
    await document.fonts.ready;
    setMyFontFace(fontFace);
    setProgress(null);
  };
  return (
    <Layout>
      <div className={styles.textareaContainer} >
        <Textarea className={styles.textarea} value={inpStr} placeholder={instruction}
          onChange={evt=>setInpStr(evt.currentTarget.value)}
        />
      </div>
      {inpStr&&<>
        <div className={styles.buttonContainer} >
          <Button onClick={onSubmit} >Submit!</Button>
        </div>
        {myFontFace&&<>
          <div className={styles.sectionContainer} >
            <Section className={styles.section}>
              {inpStr}
            </Section>
          </div>
        </>}
      </>}
      <Loader loading={progress!=null} width="5rem" height="5rem"
        message={`${Math.floor(((progress??0)/[...inpStr].length)*100)} %`} />
    </Layout>
  );
}

const reshape = (data:Uint8ClampedArray): number[][] => {
  const ini = [...Array(NUM_CHANNEL)].map<number[]>(()=>[]);
  return data.reduce((pre,cur,i) => {
    pre[i%NUM_CHANNEL].push(cur);
    return pre;
  },ini);
};

const toGlyph = async (files: File[], chr: string,
  setProgress: React.Dispatch<React.SetStateAction<number|null>>) => {
  const promises = files.map(file => toFloatNums(file!)); // eslint-disable-line @typescript-eslint/no-non-null-assertion
  const styleNumArrays = await Promise.all(promises);
  const styleNumArray = styleNumArrays.reduce((pre,cur) => pre.concat(cur));
  const styleDims = [BATCH_SIZE, files.length, IMAGE_HEIGHT, IMAGE_WIDTH];
  const styleTensor = new Tensor("float32", Float32Array.from(styleNumArray), styleDims);
  const res = await fetch(`./content-images/${toFileChar(chr)}.png`);
  const blob = await res.blob();
  const contentDims = [BATCH_SIZE, NUM_CHANNEL_GREY, IMAGE_HEIGHT, IMAGE_WIDTH];
  const contentNumArray = await toFloatNums(blob);
  const contentTensor = new Tensor("float32", Float32Array.from(contentNumArray), contentDims);
  const session = await InferenceSession.create('/FTransGAN.onnx',
    { executionProviders: ['wasm'], graphOptimizationLevel: 'all' });
  const feeds: Record<string, Tensor> = {};
  feeds[session.inputNames[0]] = contentTensor;
  feeds[session.inputNames[1]] = styleTensor;
  const outputData = await session.run(feeds);
  const output = outputData[session.outputNames[0]];
  const canvas = toImage(output.data as Float32Array);
  //{
  //  const body = document.querySelector("body") as HTMLElement;
  //  body.appendChild(canvas);
  //}
  await potraceInit();
  const paths$ = await potrace(canvas,{ extractcolors: false, pathonly: true });
  const paths = paths$ as unknown as string[]; // tomayac/esm-potrace-wasm#14
  const d = paths.join(" ");
  if (!d) throw new Error();
  const unicode = chr.codePointAt(0)!.toString(16); // eslint-disable-line @typescript-eslint/no-non-null-assertion
  setProgress(v=>(v??0)+1);
  return { name: chr, unicode, d };
};

const toFloatNums = async (blob: Blob): Promise<number[]> => {
  const img = await createImageElement(blob);
  const canvas = document.createElement('canvas');
  canvas.height = IMAGE_HEIGHT;
  canvas.width = IMAGE_WIDTH;
  const ctx = canvas.getContext('2d')!; // eslint-disable-line @typescript-eslint/no-non-null-assertion
  ctx.drawImage(img,0,0,IMAGE_HEIGHT,IMAGE_WIDTH);
  //{
  //  const body = document.querySelector("body") as HTMLElement;
  //  const im = document.createElement("img");
  //  im.src = canvas.toDataURL();
  //  body.appendChild(im);
  //}
  const imageData = ctx.getImageData(0,0,IMAGE_HEIGHT,IMAGE_WIDTH);
  const channels = reshape(imageData.data);
  const floatArray = Array<number>(IMAGE_HEIGHT*IMAGE_WIDTH);
  for(let i=0; i<IMAGE_HEIGHT*IMAGE_WIDTH; i++) {
    const isTransparant = channels[3][i]===0;
    if (isTransparant) {
      floatArray[i] = 1;
    } else {
      let val = channels[0][i];
      val = val / 255; // convert to float
      val = (val - MEAN) / STD; // normalize
      floatArray[i] = val;
    }
  }
  //if (blob instanceof File) {
  //  let str="";
  //  for(let i=0; i<IMAGE_HEIGHT; i++) {
  //    for(let j=0; j<IMAGE_WIDTH; j++) {
  //      const val = floatArray[i*IMAGE_WIDTH+j] + 1;
  //      str += val.toFixed(2) + " ";
  //    }
  //    str+="\n";
  //  }
  //  console.log(blob.name);
  //  console.log(str);
  //}
  return floatArray;
};

const createImageElement = (blob:Blob): Promise<HTMLImageElement> => {
  const img = document.createElement('img');
  img.src = URL.createObjectURL(blob);
  const promise = new Promise<HTMLImageElement>(resolve => {
    img.onload = () => {
      resolve(img);
    };
  });
  return promise;
};

const toImage = (array: Float32Array): HTMLCanvasElement => {
  const imageData = new ImageData(IMAGE_HEIGHT,IMAGE_WIDTH);
  console.log('iamgeData length:',imageData.data.length);
  for(let i=0; i<IMAGE_HEIGHT*IMAGE_WIDTH; i++) {
    let val = array[i];
    val = (val * STD) + MEAN; // normalize back
    val = Math.floor((val * 255)); // convert to uint
    for(let j=0; j<NUM_CHANNEL-1; j++) {
      imageData.data[NUM_CHANNEL*i+j]=val;
    }
    imageData.data[NUM_CHANNEL*(i+1)-1]=255;
  }
  const canvas = document.createElement('canvas');
  canvas.height = IMAGE_HEIGHT;
  canvas.width = IMAGE_WIDTH;
  const ctx = canvas.getContext('2d')!; // eslint-disable-line @typescript-eslint/no-non-null-assertion
  ctx.putImageData(imageData,0,0);
  return canvas;
};