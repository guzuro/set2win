<template>
    <div class="app-topbar">
        <button @click="toggleSidebar">toggle</button>
    </div>
</template>

<script setup lang="ts">
import { useLayout } from './composables/useLayout'

const { toggleSidebar } = useLayout()
</script>

<style scoped lang="scss">
.app-topbar {
    @apply fixed top-0 bg-white p-4 left-0 right-0 h-20;
}
</style>
