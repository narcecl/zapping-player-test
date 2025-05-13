import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Languages, LanguageItem } from '@/interfaces/language';
import { LANGUAGES } from '@/lib/constants';
import LanguageApp from '@/i18n/app.json';

interface LanguageJson {
    [key: string]: {
        [key: string]: string;
    };
}

const languageData: LanguageJson = LanguageApp;

export const useLanguageStore = defineStore('language', () => {
    // --- State ---
    const availableLanguages = ref<Languages>(LANGUAGES);
    const currentLanguage = ref<LanguageItem>(availableLanguages.value[0]);

    // --- Actions ---
    const changeLanguage = (newLang: LanguageItem) => {
        currentLanguage.value = newLang;
    };

    /**
     * Translation function
     * @param key - The translation key
     * @param replaceValue - Optional replacement value for interpolations like ${value}
     */
    const $t = (key: string, replaceValue?: string): string => {
        try {
            const lang = currentLanguage.value.value;
            const translation = languageData[lang]?.[key] ?? key;

            return replaceValue ? translation.replace(/\$\{(.*?)\}/g, replaceValue) : translation;
        } catch (err) {
            console.error('Translation error:', err);
            return key;
        }
    };

    return {
        // state
        availableLanguages,
        currentLanguage,

        // actions
        changeLanguage,
        $t,
    };
});

export default useLanguageStore;
