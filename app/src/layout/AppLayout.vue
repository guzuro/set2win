<template>
    <div class="app-layout">
        <AppSidebar />

        <div class="app-layout-container">
            <div class="app-layout-main">
                <RouterView />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppSidebar from './AppSidebar.vue'
</script>

<style scoped lang="scss">
.app-layout {
    @apply flex gap-10 w-full;

    padding: 5rem 4rem;

    &-container {
        @apply w-full;
    }

    &-main {
        @apply mx-auto h-full;
    }
}
</style>
