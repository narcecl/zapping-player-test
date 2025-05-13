<script setup lang="ts">
import { useChannelStore, usePlayerStore } from '@/stores';
import { storeToRefs } from 'pinia';

import { useTimer, useMouse } from '@/composables';
import PlayerComponent from '@/components/molecules/Player/PlayerComponent.vue';

const visibilyStore = usePlayerStore();

const channelStore = useChannelStore();
const { channel } = storeToRefs(channelStore);

const { initTimer } = useTimer(() => {
    visibilyStore.toggleVisibility('controls', false);
});

useMouse(() => {
    if (channel.value.controlsOpen) return;
    visibilyStore.toggleVisibility('controls', true);
    initTimer();
});
</script>

<template>
    <PlayerComponent />
</template>

<style scoped lang="scss">
.player {
    height: 100dvh;
}
</style>
