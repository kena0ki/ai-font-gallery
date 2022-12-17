
const svg2ttf = require('svg2ttf');
export default function svg2ttfBuf(svg:string, opt?: object){
  const buf = svg2ttf(svg,opt||{}).buffer;
  return Uint8Array.from(buf);
}
