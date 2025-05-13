import { onMounted, onUnmounted } from 'vue';

export type KeyHandlerMap = Record<string, () => void>;

export interface KeyboardControlOptions {
    keyMap: KeyHandlerMap; // Making keyMap required as it's critical to the logic
    onKeyDown?: (event: KeyboardEvent) => void;
}

export function useKeyboardControls(options: KeyboardControlOptions) {
    const handleKeyEvents = (event: KeyboardEvent) => {
        const handler = options.keyMap[event.key];

        // Call the handler if it exists
        if (handler) {
            handler();
        }
        // Otherwise, use the provided onKeyDown handler if available
        else if (options.onKeyDown) {
            options.onKeyDown(event);
        }
    };

    onMounted(() => {
        // Attach the event listener when the component is mounted
        document.addEventListener('keydown', handleKeyEvents);
    });

    onUnmounted(() => {
        // Remove the event listener when the component is unmounted
        document.removeEventListener('keydown', handleKeyEvents);
    });
}

export default useKeyboardControls;
