<script setup lang="ts">
import { computed } from 'vue';
import useLanguageStore from '@/stores/language';
import type { ChannelLogo } from '@/interfaces/channel';

interface ChannelLogoProps extends ChannelLogo {
    size?: 'small' | 'large';
}

const { size = 'small' } = defineProps<ChannelLogoProps>();
const { $t } = useLanguageStore();

const componentClasses = computed(() => ({
    channer__item__logo: true,
    [`channer__item__logo--${size}`]: true,
}));
</script>

<template>
    <picture :class="componentClasses">
        <img :src="logo" :alt="$t('accessibility_channel_logo', name)" />
    </picture>
</template>

<style scoped lang="scss">
.channer__item__logo {
    border-radius: 4px;
    overflow: hidden;

    &--small {
        width: 36px;
        height: 36px;
    }

    &--large {
        width: 48px;
        height: 48px;
    }
}
</style>
