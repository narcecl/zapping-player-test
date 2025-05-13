import { onMounted, onUnmounted } from 'vue';
import { DEFAULT_DELAY } from '@/lib/constants';

export function useTimer(callback: () => void, delay: number = DEFAULT_DELAY) {
    let timer: ReturnType<typeof setTimeout>;

    const initTimer = () => {
        clearTimeout(timer);
        timer = setTimeout(callback, delay);
    };

    onMounted(() => {
        // Initialize timer when mounted
        initTimer();
    });

    onUnmounted(() => {
        // Clean up the timer on unmount
        clearTimeout(timer);
    });

    // Return the function to trigger the timer manually
    return { initTimer };
}

export default useTimer;
