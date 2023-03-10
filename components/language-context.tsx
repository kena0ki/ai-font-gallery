import { createContext, useContext } from 'react';
import { NUM_STYLES } from '../utils/constants';
import { FilteredKeys } from '../utils/type-utils';

export const LanguageContext = createContext<LanguageUnion>('EN');

export const useLanguage = () => {
  const lang = useContext(LanguageContext);
  if (!LANGUAGES.includes(lang)) throw new Error(lang);

  type StringKeys = FilteredKeys<typeof TEXTTABLE.EN, string>;
  type TextFunction = (...args:string[])=>string;
  type FunctionKeys = FilteredKeys<typeof TEXTTABLE.EN, TextFunction>;

  function getT(key:StringKeys): string;
  function getT(key:FunctionKeys): TextFunction;
  function getT(key:StringKeys|FunctionKeys):(string|TextFunction) {
    return TEXTTABLE[lang][key];
  }
  return getT;
};

export const LANGUAGES = ['EN','JA'] as const;
export type LanguageUnion = typeof LANGUAGES[number];
const TEXTTABLE = {
  EN: {
    I101: `AI Font Gallery`,
    I102: `You can try generating fonts using AI models.
It can generate a font from a few character images.`,
    I103: `Currently, the site uses an AI model named `,
    I104: `FTransGAN`,
    I105: `.`,
    I201: `Upload ${NUM_STYLES} character images. The characters need to be latin alphabets.`,
    I202: `Upload character images here.   `,
    I301: `Type some words here.`,
    I302: `Not enough character images were uploaded.`,
    I303: `Input characters`,
    I304: `Characters using the generated font`,
    E301: (chr:string) => `Unsupported character, ${chr}, was found.`,
    E302: "Sorry, something went wrong. Please try reloading and trying again.",
  },
  JA: {
    I101: `AI Font Gallery`,
    I102: `AIによるフォント自動生成を試すことができるサイトです。
数枚の文字画像からフォントを生成します。`,
    I103: `現状は`,
    I104: `FTransGAN`,
    I105: `というAIのモデルにより生成を行います。`,
    I201: `ローマ字（A-Z,a-z）の画像を、${NUM_STYLES}枚アップロードしてください。`,
    I202: `生成元画像をここにアップロードしてください`,
    I301: `ここに何か入力してください`,
    I302: `アップロードされたファイルが不足しています`,
    I303: `入力文字列`,
    I304: `生成フォント適用済み文字列`,
    E301: (chr:string) => `文字 ${chr} には未対応です`,
    E302: "エラーが発生しましたリロードして再度やり直してください",
  },
} as const;

export const TXTKEYTABLE = {
  first: {
    title: 'I101', //`AI Font Gallery`,
    description: 'I102',// `AIによるフォント自動生成を試すことができるサイトです。\n`+
                        // `数枚の文字画像からフォントを生成します。`,
    disclaimer1: 'I103', // `現状は`,
    disclaimer2: 'I104', // `FTransGAN`,
    disclaimer3: 'I105', // `というAIのモデルにより生成を行います。`,
  },
  second: {
    note: 'I201', // `ローマ字（A-Z,a-z）の画像を、${NUM_STYLES}枚アップロードしてください。`,
    instruction: 'I202', // `生成元画像をここにアップロードしてください`,
  },
  third: {
    instruction: 'I301', //`ここに何か入力してください`,
    notEnoughFiles: 'I302', //`アップロードされたファイルが不足しています`,
    labelInput: 'I303', //`入力文字列`,
    labelOutput: 'I304', //`生成されたフォントを使用した文字列`,
    unsupportedChar: 'E301', //(chr:string) => `文字 ${chr} には未対応です`,
    unknownError: 'E302', //"エラーが発生しましたリロードして再度やり直してください",
  }
} as const;

