<script setup lang="ts">
import { storeToRefs } from 'pinia';
import PlayerView from '@/components/organisms/PlayerView/PlayerView.vue';
import ChannelList from '@/components/molecules/ChannelList/ChannelList.vue';
import ControlsContainer from '@/components/organisms/ControlsContainer/ControlsContainer.vue';
import { useChannelStore, usePlayerStore } from '@/stores';
import useKeyboardControls from '@/composables/keys';
import { router } from '@/router/router';
import { onMounted } from 'vue';
import { getChannelsList } from '@/lib/fetch';

const visibilityStore = usePlayerStore();
const channelStore = useChannelStore();
const { areControlsOpen, currentChannel, channelList } = storeToRefs(channelStore);

useKeyboardControls({
    keyMap: {
        ArrowDown: () => {
            channelStore.changeChannelByKey('ArrowDown');
        },
        ArrowUp: () => {
            channelStore.changeChannelByKey('ArrowUp');
        },
        ArrowRight: () => {
            visibilityStore.toggleVisibility('controls', false);
            setTimeout(() => channelStore.toggleList(!areControlsOpen.value), 200);
        },
        ArrowLeft: () => {
            router.push({
                name: 'channel_view',
                params: { channelNumber: currentChannel.value?.number },
            });
        },
        Escape: () => {
            visibilityStore.toggleVisibility('controls', false);
        },
        f: () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
            } else {
                document.exitFullscreen?.();
            }
        },
    },
});

onMounted(async () => {
    try {
        if (!channelList.value?.length) {
            const channels = await getChannelsList();
            if (channels.length) {
                channelStore.setChannels(channels);
                channelStore.changeChannel(channels[0]);
            } else {
                throw new Error('Error Adding the channels');
            }
        }
    } catch (error) {
        console.error('Error loading channels:', error);
    }
});
</script>

<template>
    <main>
        <PlayerView />
        <ControlsContainer />
        <ChannelList />
    </main>
</template>

<style scoped lang="scss"></style>
