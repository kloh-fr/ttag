export interface GetTextComment {
    translator: string;
    reference: string;
    extracted: string;
    flag: string;
    previous: string;
}
export type TTagTranslation = {
    msgctxt?: string | undefined;
    msgid: string;
    msgid_plural?: any;
    msgstr: string[];
    comments?: GetTextComment | undefined;
};
export type TTagTranslations = {
    charset: string;
    headers: {
        [headerName: string]: string;
    };
    translations: {
        [msgctxt: string]: {
            [msgId: string]: TTagTranslation;
        };
    };
};
export type TTagCompactTranslations = {
    charset: string;
    headers: {
        [headerName: string]: string;
    };
    contexts: {
        [msgctxt: string]: {
            [msgId: string]: string[];
        };
    };
};
type ConfigType = {
    locales: {
        [locale: string]: TTagTranslations | TTagCompactTranslations;
    };
    currentLocales: (string | (() => string))[];
    currentLocale: string | (() => string);
    dedent: boolean;
    defaultLang: string;
};
export default class Config {
    config: ConfigType;
    addLocale(locale: string, localeData: TTagTranslations | TTagCompactTranslations): void;
    setCurrentLocale(locale: string | (() => string)): void;
    setDedent(dedent: boolean): void;
    setCurrentLocales(locales: string[]): void;
    getAvailLocales(): {
        [locale: string]: TTagTranslations | TTagCompactTranslations;
    };
    getCurrentLocales(): string[];
    getCurrentLocale(): string;
    isDedent(): boolean;
    setDefaultLang(lang: string): void;
    getDefaultPluralFn(): any;
    getDefaultPluralFormsCount(): any;
    getCurrentLocaleHeaders(): {
        [headerName: string]: string;
    } | {
        [headerName: string]: string;
    };
}
export {};
