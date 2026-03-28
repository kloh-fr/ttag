import Config, { TTagTranslations, TTagCompactTranslations } from './config';
export declare class Context {
    context: string;
    constructor(context: string);
    getContext(): string;
}
export type StringWithRawData = string & {
    _strs: TemplateStringsArray;
    _exprs: unknown[];
};
export declare function msgid(strings: TemplateStringsArray, ...exprs: (string | number)[]): StringWithRawData;
export type LocaleData = TTagTranslations | TTagCompactTranslations;
export declare class TTag {
    private conf;
    private ctx;
    constructor({ config, context }?: {
        config: Config;
        context?: Context;
    });
    private maybeDedent;
    private findTransObj;
    private findTranslation;
    setDefaultLang: (lang: string) => void;
    useLocales: (locales: string[]) => void;
    setDedent: (value: boolean) => void;
    useLocale: (locale: string | (() => string)) => void;
    addLocale: (locale: string, data: TTagTranslations | TTagCompactTranslations) => void;
    t: (strings: TemplateStringsArray, ...exprs: any[]) => string;
    jt: (strings: TemplateStringsArray, ...exprs: any[]) => any[];
    ngettext: (...args: [StringWithRawData, ...string[], number]) => string;
    gettext: (id: string) => string;
    _: (id: string) => string;
    private copyWithNewContext;
    c: (context: string) => {
        t: (strings: TemplateStringsArray, ...exprs: any[]) => string;
        jt: (strings: TemplateStringsArray, ...exprs: any[]) => any[];
        gettext: (id: string) => string;
        ngettext: (...args: [StringWithRawData, ...string[], number]) => string;
    };
}
export declare const c: (context: string) => {
    t: (strings: TemplateStringsArray, ...exprs: any[]) => string;
    jt: (strings: TemplateStringsArray, ...exprs: any[]) => any[];
    gettext: (id: string) => string;
    ngettext: (...args: [StringWithRawData, ...string[], number]) => string;
};
export declare const _: (id: string) => string;
export declare const addLocale: (locale: string, data: TTagTranslations | TTagCompactTranslations) => void;
export declare const gettext: (id: string) => string;
export declare const jt: (strings: TemplateStringsArray, ...exprs: any[]) => any[];
export declare const ngettext: (...args: [StringWithRawData, ...string[], number]) => string;
export declare const setDedent: (value: boolean) => void;
export declare const setDefaultLang: (lang: string) => void;
export declare const t: (strings: TemplateStringsArray, ...exprs: any[]) => string;
export declare const useLocale: (locale: string | (() => string)) => void;
export declare const useLocales: (locales: string[]) => void;
