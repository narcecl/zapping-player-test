import { onMounted, onUnmounted } from 'vue';

export interface DistanceObj {
    distanceX: number;
    distanceY: number;
    distance: number;
}

export type CallbackProps = (obj: DistanceObj) => void;

export function useMouse(callback: CallbackProps, threshold: number = 15) {
    let startX: number | null = null;
    let startY: number | null = null;

    const handleMouseMove = (event: MouseEvent) => {
        if (startX === null || startY === null) {
            startX = event.clientX;
            startY = event.clientY;
            return;
        }

        const distanceX = event.clientX - startX;
        const distanceY = event.clientY - startY;
        const distance = Math.hypot(distanceX, distanceY);

        if (distance >= threshold) {
            callback({ distanceX, distanceY, distance });
            startX = event.clientX;
            startY = event.clientY;
        }
    };

    onMounted(() => {
        // Adding passive flag to improve performance for mousemove events
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
    });

    onUnmounted(() => {
        window.removeEventListener('mousemove', handleMouseMove);
    });
}

export default useMouse;
