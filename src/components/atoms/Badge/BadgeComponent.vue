<template>
    <div class="badge">
        <slot />
    </div>
</template>

<style lang="scss" scoped>
.badge {
    background: rgba(white, 0.2);
    padding: 4px 8px;
    border-radius: 24px;
    color: white;
    border: 1px solid rgba(white, 0.1);
    font-size: var(--font-size-xsmall);
}
</style>
