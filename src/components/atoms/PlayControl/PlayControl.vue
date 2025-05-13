<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { usePlayerStore } from '@/stores';
import ActionButton from '@/components/atoms/ActionButton/ActionButton.vue';
import PlayIcon from '@/components/icons/PlayIcon.vue';
import PauseIcon from '@/components/icons/PauseIcon.vue';
import { computed } from 'vue';

const playerStore = usePlayerStore();
const { videoStatus } = storeToRefs(playerStore);

const ariaLabel = computed(() => {
    if (videoStatus.value === 'playing') return 'Pausar video';
    return 'Reproducir video';
});

const changePlayStatus = () => {
    const newStatus = videoStatus.value === 'playing' ? 'paused' : 'playing';
    playerStore.changeVideoStatus(newStatus);
};
</script>

<template>
    <ActionButton @click="changePlayStatus" :aria-label="ariaLabel">
        <PlayIcon v-if="videoStatus === 'paused'" aria-hidden="true" />
        <PauseIcon v-if="videoStatus === 'playing'" aria-hidden="true" />
    </ActionButton>
</template>
