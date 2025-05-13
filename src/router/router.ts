import { createMemoryHistory, createRouter } from 'vue-router';

import HomeView from '@/components/pages/HomeView.vue';
import SingleView from '@/components/pages/SingleView.vue';

const routes = [
    { path: '/', component: HomeView },
    { path: '/channel/:channelNumber', name: 'channel_view', component: SingleView },
];

export const router = createRouter({
    history: createMemoryHistory(),
    routes,
});
