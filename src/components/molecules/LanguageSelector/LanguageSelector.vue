<script setup lang="ts">
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useLanguageStore } from '@/stores/language';
import type { LanguageItem } from '@/interfaces/language';
import ChevronIcon from '@/components/icons/ChevronIcon.vue';

const optionsOpen = ref(false);
const languageStore = useLanguageStore();
const { availableLanguages, currentLanguage } = storeToRefs(languageStore);

const componentClasses = computed(() => ({
    language_select: true,
    [`language_select--active`]: optionsOpen.value,
}));

const changeLanguage = (language: LanguageItem) => {
    languageStore.changeLanguage(language);
    optionsOpen.value = false;
};
</script>

<template>
    <div :class="componentClasses">
        <button
            class="language_select__button"
            @click="() => (optionsOpen = !optionsOpen)"
            :aria-label="languageStore.$t('accessibility_current_language', currentLanguage.label)"
        >
            {{ currentLanguage.flag }}
            <span class="text-xs">{{ currentLanguage.value.toLocaleUpperCase() }}</span>

            <ChevronIcon aria-hidden="true" />
        </button>

        <Transition name="fade-down">
            <nav
                v-show="optionsOpen"
                class="language_select__list"
                :aria-label="languageStore.$t('accessibility_available_languages')"
            >
                <ul>
                    <li v-for="language in availableLanguages" :key="language.value">
                        <button
                            @click="() => changeLanguage(language)"
                            :aria-label="
                                languageStore.$t('accessibility_change_languages', language.label)
                            "
                        >
                            {{ language.flag }}
                            <span class="text-white text-xs">
                                {{ language.label }}
                            </span>
                        </button>
                    </li>
                </ul>
            </nav>
        </Transition>
    </div>
</template>

<style lang="scss">
.language_select {
    position: relative;

    &__button {
        background: rgba(white, 0.1);
        padding: 8.5px 16px;
        border-radius: 32px;
        cursor: pointer;
        color: white;
        display: inline-flex;
        align-items: center;
        gap: 8px;

        &:hover {
            background-color: rgba(white, 0.2);
        }

        svg {
            transform: rotate(180deg);
            transition: all 0.3s ease;
            fill: white;
            path {
                fill: white;
            }
        }
    }
    &__list {
        position: absolute;
        padding: 8px;
        background: rgba(white, 0.1);
        border-radius: 8px;
        margin-top: 10px;
        right: 0;
        min-width: 120px;

        li {
            text-align: center;
            button {
                cursor: pointer;
                padding: 8px;
            }
        }
    }

    &--active {
        .language_select {
            &__button {
                background: white;
                color: black;

                &:hover {
                    background: white;
                    color: black;
                }

                svg {
                    fill: black;
                    transform: none;
                    path {
                        fill: black;
                    }
                }
            }
        }
    }
}
</style>
