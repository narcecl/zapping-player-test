<script setup lang="ts">
import { useTemplateRef, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { usePlayerStore, useChannelStore } from '@/stores';

const videoRef = useTemplateRef<HTMLVideoElement | null>('player');

const playerStore = usePlayerStore();
const { volume, videoStatus } = storeToRefs(playerStore);

const channelStore = useChannelStore();
const { currentChannel } = storeToRefs(channelStore);

watch(volume, () => {
    if (videoRef.value) {
        videoRef.value.volume = volume.value;
    }
});

watch(videoStatus, () => {
    if (videoStatus.value === 'playing') videoRef.value?.play();
    else videoRef.value?.pause();
});

watch(currentChannel, () => {
    playerStore.changeVideoStatus('playing');
    videoRef.value?.play();
});
</script>

<template>
    <div class="player">
        <video
            :controls="false"
            :disablePictureInPicture="true"
            :key="currentChannel?.name"
            autoplay
            loop
            poster="https://placehold.co/1920x1920/000000/1a1a1a?text=Cargando el video..."
            ref="player"
        >
            <source :src="currentChannel?.video" />
        </video>
    </div>
</template>

<style scoped lang="scss">
.player {
    position: relative;
    &:after {
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }
    video {
        pointer-events: none;
        width: 100%;
        height: 100dvh;
        aspect-ratio: 16 / 9;
    }
}
</style>
