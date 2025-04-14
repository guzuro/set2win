<template>
    <Card class="app-layout-sidebar">
        <template #content> sidebar </template>
    </Card>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.app-layout-sidebar {
    @apply w-full max-w-96;

    height: calc(100vh - 10rem);
}
</style>
