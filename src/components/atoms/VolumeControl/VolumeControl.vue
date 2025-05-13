<script setup lang="ts">
import { ref } from 'vue';
import ActionButton from '@/components/atoms/ActionButton/ActionButton.vue';
import VolumeIcon from '@/components/icons/VolumeIcon.vue';
import { usePlayerStore, useLanguageStore } from '@/stores';
import { storeToRefs } from 'pinia';
import MuteIcon from '@/components/icons/MuteIcon.vue';

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
    <div class="volume__control flex items-center gap-4">
        <ActionButton @click="ToggleVolumeControl" :aria-label="$t('controls_volume')">
            <!-- I used other sound icon for UX purposes -->
            <VolumeIcon v-if="volume > 0.1" aria-hidden="true" class="text-white" />
            <MuteIcon v-if="!volume" aria-hidden="true" class="text-white" />
        </ActionButton>

        <Transition name="slide-left">
            <div
                v-if="visibilityStatus.volume"
                class="volume__control__bar"
                ref="barRef"
                @mousedown="startDrag"
                @click="handleClick"
            >
                <div
                    class="volume__control__bar__progress"
                    :style="{ width: `${volume * 100}%` }"
                />
            </div>
        </Transition>
    </div>
</template>

<style lang="scss" scoped>
.volume__control {
    min-width: 300px;

    &__bar {
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
