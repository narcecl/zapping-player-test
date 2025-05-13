<script setup lang="ts">
import { nextTick, useTemplateRef } from 'vue';
import { storeToRefs } from 'pinia';
import { useChannelStore } from '@/stores/channel';
import type { Channel } from '@/interfaces/channel';
import { useTimer, useMouse, useKeyboardControls } from '@/composables';
import ChannelItem from '@/components/atoms/ChannelItem/ChannelItem.vue';
import { usePlayerStore } from '@/stores';

const playerStore = usePlayerStore();

const channelStore = useChannelStore();
const { channel, areControlsOpen } = storeToRefs(channelStore);

const channelListRef = useTemplateRef<HTMLVideoElement | null>('channel_list');

const { initTimer } = useTimer(() => {
    if (channel.value.controlsOpen) channelStore.toggleList(false);
}, 2000);

const handleChangeChannel = (channel: Channel) => {
    channelStore.changeChannel(channel);
    initTimer();
};

useMouse(() => {
    initTimer();
});

useKeyboardControls({
    keyMap: {
        Escape: () => {
            channelStore.toggleList(false);
            initTimer();
        },
        ArrowRight: () => {
            playerStore.toggleVisibility('controls', false);
            setTimeout(() => {
                channelStore.toggleList(!areControlsOpen.value);
                initTimer();
            }, 200);
        },
    },
});

nextTick(() => {
    // Prevent close when scrolling
    channelListRef.value?.addEventListener('scroll', () => {
        initTimer();
    });
});
</script>

<template>
    <Transition name="slide-left">
        <aside v-show="channel.controlsOpen && channel.channels?.length" class="channel__list">
            <ul ref="channel_list" class="channel__list__cont">
                <li v-for="channel in channel.channels" :key="channel.number">
                    <ChannelItem v-bind="channel" @click="() => handleChangeChannel(channel)" />
                </li>
            </ul>
        </aside>
    </Transition>
</template>

<style lang="scss" scoped>
.channel__list {
    width: 100%;
    overflow: hidden;
    height: 100dvh;
    position: absolute;
    padding: 64px 0 0 64px;
    background: #000;
    background: linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;

    &__cont {
        width: 300px;
        height: 100%;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 10px;

        li {
            width: 100%;
        }
    }
}
</style>
