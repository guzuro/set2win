<template>
    <div class="auth-page">
        <RouterView />
    </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<style scoped lang="scss">
.auth-page {
    @apply w-full flex justify-center items-center h-full;

    .auth-sign-in,
    .auth-sign-up {
        @apply w-full;

        max-width: 50%;
    }
}
</style>
