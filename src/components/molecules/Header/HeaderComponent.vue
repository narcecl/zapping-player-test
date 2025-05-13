<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useChannelStore, usePlayerStore, useLanguageStore } from '@/stores';
import ActionButton from '@/components/atoms/ActionButton/ActionButton.vue';
import ChannelLogo from '@/components/atoms/ChannelLogo/ChannelLogo.vue';
import ZappingBrand from '@/assets/images/brand-logo.png';
import HamburgerIcon from '@/components/icons/HamburgerIcon.vue';
import LanguageSelector from '../LanguageSelector/LanguageSelector.vue';

const { $t } = useLanguageStore();
const visibilyStore = usePlayerStore();

const channelStore = useChannelStore();
const { currentChannel } = storeToRefs(channelStore);

const openChannelList = () => {
    visibilyStore.toggleVisibility('controls', false);
    setTimeout(() => channelStore.toggleList(true), 200);
};
</script>

<template>
    <div class="player__header">
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
                <ActionButton @click="openChannelList">
                    <HamburgerIcon aria-hidden="true" />
                </ActionButton>

                <Transition name="fade-down">
                    <div
                        v-show="currentChannel"
                        :key="currentChannel?.name"
                        class="flex items-center gap-4"
                    >
                        <ChannelLogo
                            :name="currentChannel?.name ?? ''"
                            :logo="currentChannel?.logo_color ?? ''"
                            size="small"
                        />
                        <p class="text-white">
                            {{ currentChannel?.number }} | {{ currentChannel?.name }}
                        </p>
                    </div>
                </Transition>
            </div>

            <div class="flex items-center gap-4">
                <LanguageSelector />

                <a
                    href="https://zapping.com"
                    target="_blank"
                    :aria-label="$t('accessibility_brand_website')"
                >
                    <picture>
                        <img :src="ZappingBrand" alt="" />
                    </picture>
                </a>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.player__header {
    position: absolute;
    z-index: 9;
    width: 100%;
    top: 0;
    padding: 64px;
    height: 50dvh;
    background: #000;
    background: linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
}
</style>
