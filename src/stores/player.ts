import { computed, reactive } from 'vue';
import { defineStore } from 'pinia';
import { DEFAULT_VOLUME } from '@/lib/constants';

type MediaStatus = 'playing' | 'paused';

export const usePlayerStore = defineStore('player', () => {
    // --- States ---
    const visibilityStatus = reactive({
        controls: true,
        volume: false,
    });

    const media = reactive({
        volume: DEFAULT_VOLUME,
        status: 'playing' as MediaStatus,
    });

    // --- Getters ---
    const volume = computed(() => media.volume);
    const videoStatus = computed(() => media.status);

    // --- Actions ---
    const toggleVisibility = (key: keyof typeof visibilityStatus, value: boolean) => {
        visibilityStatus[key] = value;
    };

    const changeVolume = (newVolume: number) => {
        media.volume = newVolume;
    };

    const changeVideoStatus = (newStatus: typeof media.status) => {
        media.status = newStatus;
    };

    const toggleMute = () => {
        if (volume.value > 0.1) {
            changeVolume(0);
        } else {
            changeVolume(0.5);
        }
    };

    return {
        // state
        media,
        visibilityStatus,

        // getters
        videoStatus,
        volume,

        // actions
        changeVideoStatus,
        changeVolume,
        toggleMute,
        toggleVisibility,
    };
});

export default usePlayerStore;
