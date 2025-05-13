<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useChannelStore, useLanguageStore } from '@/stores';
import BadgeComponent from '@/components/atoms/Badge/BadgeComponent.vue';
import ContextualIcon from '@/components/atoms/ContextualIcon/ContextualIcon.vue';
import useKeyboardControls from '@/composables/keys';
import { router } from '@/router/router';
import ZappingLogo from '@/components/icons/ZappingLogo.vue';
import PlayerComponent from '@/components/molecules/Player/PlayerComponent.vue';

const languageStore = useLanguageStore();
const { $t } = useLanguageStore();
const { currentLanguage } = storeToRefs(languageStore);

const channelStore = useChannelStore();
const { currentChannel } = storeToRefs(channelStore);

const contentByLanguage = computed(
    () => currentChannel?.value?.currentShow[currentLanguage.value.value],
);

useKeyboardControls({
    keyMap: {
        Escape: () => {
            router.push('/');
        },
    },
});
</script>

<template>
    <div
        class="channel__view px-4"
        :style="{ backgroundImage: `url(${contentByLanguage?.poster})` }"
    >
        <div class="pt-[16px] py-0 md:pt-[45px] md:pl-[53px]">
            <div class="flex items-center gap-1">
                <div class="flex items-center gap-1">
                    <ContextualIcon>[ESC]</ContextualIcon>
                    <p class="text-white-muted text-xs">
                        {{ $t('controls_exit') }}
                    </p>
                </div>
            </div>
        </div>
        <div
            class="container mx-auto h-full flex flex-col md:flex-row gap-12 sm:gap-24 items-center justify-center"
        >
            <div class="w-full md:w-[70%]">
                <div class="rounded-3xl overflow-hidden">
                    <PlayerComponent />
                </div>
            </div>
            <div class="w-full md:w-[30%]">
                <div class="channel__view__content flex flex-col gap-8">
                    <h1 class="text-white text-lg">{{ contentByLanguage?.name }}</h1>

                    <div>
                        <p class="text-sm text-content-secondary">
                            Título original: {{ contentByLanguage?.originalTitle }}
                        </p>
                        <p class="text-sm text-content-secondary">
                            <a :href="`${contentByLanguage?.imdb}/releaseinfo`" target="_blank">
                                {{ contentByLanguage?.year }}
                            </a>
                            -
                            <a :href="`${contentByLanguage?.imdb}/parentalguide`" target="_blank">
                                {{ contentByLanguage?.rating }}
                            </a>
                            -
                            {{ contentByLanguage?.duration }}
                        </p>
                    </div>

                    <div v-if="contentByLanguage?.genres.length">
                        <ul class="flex items-center gap-2">
                            <li v-for="genre in contentByLanguage?.genres" :key="genre">
                                <BadgeComponent>
                                    {{ genre }}
                                </BadgeComponent>
                            </li>
                        </ul>
                    </div>

                    <p class="text-content-secondary">
                        {{ contentByLanguage?.description }}
                    </p>

                    <ZappingLogo class="opacity-20" />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.channel__view {
    background-color: #202224;
    background-position: top right;
    background-repeat: no-repeat;
    background-size: 50%;
    width: 100%;
    height: 100%;

    &__content {
        a {
            text-decoration: underline;
        }
    }
}
</style>
