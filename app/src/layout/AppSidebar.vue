<template>
    <Card class="app-sidebar">
        <template #content> sidebar </template>
    </Card>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.app-sidebar {
    @apply w-full;

    max-width: 25rem;
    height: calc(100vh - 10rem);
}
</style>
