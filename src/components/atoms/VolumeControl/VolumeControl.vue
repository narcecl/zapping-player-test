<script setup lang="ts">
import { ref } from 'vue';
import ActionButton from '@/components/atoms/ActionButton/ActionButton.vue';
import VolumeIcon from '@/components/icons/VolumeIcon.vue';
import { usePlayerStore, useLanguageStore } from '@/stores';
import { storeToRefs } from 'pinia';

const barRef = ref<HTMLElement | null>(null);
let isDragging = false;

const { $t } = useLanguageStore();
const playerStore = usePlayerStore();
const { volume, visibilityStatus } = storeToRefs(playerStore);

const ToggleVolumeControl = () => {
    playerStore.toggleVisibility('volume', !visibilityStatus.value.volume);
};

const setVolumeFromEvent = (event: MouseEvent) => {
    if (!barRef.value) return;
    const rect = barRef.value.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const newVolume = Math.max(0, Math.min(1, x / rect.width));
    playerStore.changeVolume(newVolume);
};

const handleClick = (event: MouseEvent) => {
    setVolumeFromEvent(event);
};

const startDrag = (event: MouseEvent) => {
    isDragging = true;
    setVolumeFromEvent(event);
    window.addEventListener('mousemove', handleDrag);
    window.addEventListener('mouseup', stopDrag);
};

const handleDrag = (event: MouseEvent) => {
    if (isDragging) setVolumeFromEvent(event);
};

const stopDrag = () => {
    isDragging = false;
    window.removeEventListener('mousemove', handleDrag);
    window.removeEventListener('mouseup', stopDrag);
};
</script>

<template>
    <ActionButton @click="ToggleVolumeControl" :aria-label="$t('controls_volume')">
        <VolumeIcon aria-hidden="true" />
    </ActionButton>

    <Transition name="slide-left">
        <div
            v-if="visibilityStatus.volume"
            class="volume_bar"
            ref="barRef"
            @mousedown="startDrag"
            @click="handleClick"
        >
            <div class="volume_bar__progress" :style="{ width: `${volume * 100}%` }" />
        </div>
    </Transition>
</template>

<style lang="scss" scoped>
.volume_bar {
    width: 192px;
    height: 8px;
    position: relative;
    background: rgba(white, 0.15);
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;

    &__progress {
        background: var(--color-brand-primary);
        height: 100%;
    }
}
.slide-left {
    &-enter-active,
    &-leave-active {
        transition:
            opacity 0.3s ease,
            transform 0.2s ease;
    }
    &-enter-from {
        opacity: 0;
        transform: translateX(-10px);
    }
    &-leave-to {
        opacity: 0;
        transform: translateX(-10px);
    }
}
</style>
