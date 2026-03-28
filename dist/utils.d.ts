import Config, { TTagCompactTranslations, TTagTranslations } from './config';
export declare const getMsgid: (str: TemplateStringsArray, exprs: Array<unknown>) => string;
export declare const msgid2Orig: (id: string, exprs: Array<any>) => string;
export declare const buildStr: (strs: TemplateStringsArray, exprs: Array<any>) => string;
export declare const buildArr: (strs: TemplateStringsArray, exprs: Array<any>) => any[];
export declare function makePluralFunc(pluralStr: string): Function;
export declare function getPluralFunc(headers: {
    [headerName: string]: string;
}): string | any[];
export declare function transformTranslateObj(translateObj: TTagTranslations): TTagTranslations;
export declare function transformCompactObj(compactObj: TTagCompactTranslations): TTagCompactTranslations;
export declare function dedentStr(rawStr: string): string;
export declare function getPluralFnForTrans(config: Config): any;
