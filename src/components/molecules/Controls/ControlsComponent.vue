<script setup lang="ts">
import ActionButton from '@/components/atoms/ActionButton/ActionButton.vue';
import ContextualIcon from '@/components/atoms/ContextualIcon/ContextualIcon.vue';
import SidePanelIcon from '@/components/icons/SidePanelIcon.vue';
import PlayControl from '@/components/atoms/PlayControl/PlayControl.vue';
import VolumeControl from '@/components/atoms/VolumeControl/VolumeControl.vue';
import { useLanguageStore, useChannelStore } from '@/stores';
import { storeToRefs } from 'pinia';

const { $t } = useLanguageStore();
const channelStore = useChannelStore();
const { currentChannel } = storeToRefs(channelStore);
</script>

<template>
    <div class="player__controls">
        <div class="w-full flex flex-col gap-8">
            <div class="w-full flex items-center justify-between">
                <div class="flex items-center gap-4">
                    <PlayControl />
                    <VolumeControl />
                </div>

                <div class="flex items-center gap-1" v-if="currentChannel">
                    <ActionButton
                        :to="{
                            name: 'channel_view',
                            params: { channelNumber: currentChannel?.number },
                        }"
                        aria-label="Ir a la información del contenido actual"
                    >
                        <SidePanelIcon aria-hidden="true" />
                    </ActionButton>
                </div>
            </div>
            <div class="w-full flex items-center justify-between">
                <div class="flex items-center gap-4">
                    <div class="flex items-center gap-1">
                        <ContextualIcon>↑</ContextualIcon>
                        <ContextualIcon>↓</ContextualIcon>
                        <p class="text-white-muted text-xs">
                            {{ $t('controls_channel_change') }}
                        </p>
                    </div>
                    <div class="flex items-center gap-1">
                        <ContextualIcon>→</ContextualIcon>
                        <p class="text-white-muted text-xs">
                            {{ $t('controls_channels') }}
                        </p>
                    </div>
                    <div class="flex items-center gap-1">
                        <ContextualIcon>←</ContextualIcon>
                        <p class="text-white-muted text-xs">
                            {{ $t('controls_info') }}
                        </p>
                    </div>
                    <div class="flex items-center gap-1">
                        <ContextualIcon>F</ContextualIcon>
                        <p class="text-white-muted text-xs">
                            {{ $t('controls_full') }}
                        </p>
                    </div>
                    <div class="flex items-center gap-1">
                        <ContextualIcon>M</ContextualIcon>
                        <p class="text-white-muted text-xs">
                            {{ $t('controls_mute') }}
                        </p>
                    </div>
                </div>

                <div class="flex items-center gap-1">
                    <div class="flex items-center gap-1">
                        <ContextualIcon>[ESC]</ContextualIcon>
                        <p class="text-white-muted text-xs">
                            {{ $t('controls_exit') }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.player__controls {
    position: absolute;
    z-index: 9;
    width: 100%;
    bottom: 0;
    padding: 64px 64px 24px;
    height: 50dvh;
    background: #000;
    background: linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
    display: flex;
    align-items: end;
}
</style>
