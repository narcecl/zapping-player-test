import { computed, reactive } from 'vue';
import { defineStore } from 'pinia';
import type { Channel } from '@/interfaces/channel';

interface ChannelStore {
    controlsOpen: boolean;
    channels: Channel[];
}

export const useChannelStore = defineStore('channel', () => {
    // --- State ---
    const channel = reactive<ChannelStore>({
        controlsOpen: false,
        channels: [],
    });

    // --- Getters ---
    const currentChannel = computed(() => {
        return channel.channels.find((channel) => channel.active) ?? null;
    });

    const channelList = computed(() => channel.channels);
    const areControlsOpen = computed(() => channel.controlsOpen);

    // --- Actions ---
    const setChannels = (channels: Channel[]) => {
        channel.channels = channels;
    };

    const changeChannel = (newChannel: Channel) => {
        channel.channels = channel.channels.map((channel) => ({
            ...channel,
            active: channel.name === newChannel.name,
        }));
    };

    const toggleList = (newValue: boolean) => {
        channel.controlsOpen = newValue;
    };

    const changeChannelByKey = (keyCode: 'ArrowDown' | 'ArrowUp') => {
        const currentIndex = channel.channels.findIndex((c) => c.active);
        const total = channel.channels.length;

        if (total === 0 || currentIndex === -1) return;

        const nextIndex =
            keyCode === 'ArrowDown'
                ? (currentIndex + 1) % total
                : (currentIndex - 1 + total) % total;
        changeChannel(channel.channels[nextIndex]);
    };

    return {
        // State
        channel,

        // Getters
        currentChannel,
        channelList,
        areControlsOpen,

        // Actions
        setChannels,
        changeChannel,
        toggleList,
        changeChannelByKey,
    };
});

export default useChannelStore;
