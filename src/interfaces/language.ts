export type Language = 'es' | 'pr';

export interface LanguageItem {
    flag: string;
    label: string;
    value: Language;
}

export type Languages = LanguageItem[];
