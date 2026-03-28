import { TTagTranslations, TTagCompactTranslations } from './config';
export declare function validateLocaleCode(locale: string): void;
export declare function validateLocaleData(data: TTagTranslations | TTagCompactTranslations): void;
export declare function validateLocales(locales: string[], availLocales: {
    [locale: string]: TTagTranslations | TTagCompactTranslations;
}): void;
export declare function validateNgettextMsgid(str: any): void;
export declare function validateNgettextNumber(n: any): void;
export declare function validateNgettextPluralForms(expectedFormsCount: number, actualFormsCount: number): void;
export declare function validateLang(lang: string): void;
