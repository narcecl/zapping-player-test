import { computed, reactive } from 'vue';
import { defineStore } from 'pinia';

type MediaStatus = 'playing' | 'paused';

export const usePlayerStore = defineStore('player', () => {
    // --- States ---
    const visibilityStatus = reactive({
        controls: true,
        volume: false,
    });

    const media = reactive({
        volume: 0.5,
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

    return {
        // state
        media,
        visibilityStatus,

        // getters
        volume,
        videoStatus,

        // actions
        toggleVisibility,
        changeVolume,
        changeVideoStatus,
    };
});

export default usePlayerStore;
