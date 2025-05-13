<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { usePlayerStore } from '@/stores/player';
import HeaderComponent from '@/components/molecules/Header/HeaderComponent.vue';
import ControlsComponent from '@/components/molecules/Controls/ControlsComponent.vue';

const playerStore = usePlayerStore();
const { visibilityStatus } = storeToRefs(playerStore);
</script>

<template>
    <div class="player__container">
        <Transition name="slide-down">
            <HeaderComponent v-if="visibilityStatus.controls" />
        </Transition>

        <Transition name="slide-up">
            <ControlsComponent v-if="visibilityStatus.controls" />
        </Transition>
    </div>
</template>

<style scoped lang="scss">
.player__container {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
}
</style>
