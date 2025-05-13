import axios from 'axios';
import type { Channel, ChannelResponse } from '@/interfaces/channel';
import { CONTENT_SHOW_DEMO, AVAILABLE_VIDEOS } from './constants';
import { sortByKey, getRandomItem } from './helpers';

export const getChannelsList = async (): Promise<Channel[]> => {
    try {
        const { data } = await axios<ChannelResponse>(
            'https://dev-alquinta.zappingtv.com/v1/web/channels',
        );

        if (!data || !data.data.length) {
            return [];
        }

        // Including the current show and video (placeholder)
        const availableChannels = data.data.map((channel) => ({
            ...channel,
            video: getRandomItem(AVAILABLE_VIDEOS),
            currentShow: CONTENT_SHOW_DEMO,
        }));

        // Ensure sorting happens correctly
        const orderedChannels = sortByKey(availableChannels, 'number');
        return orderedChannels;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw new Error('Failed to fetch channel data');
    }
};
