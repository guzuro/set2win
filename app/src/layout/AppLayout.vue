<template>
    <div
        class="app-layout"
        :class="{
            'app-layout-inactive': !layoutState.mobileSidebar && !isSidebarActive,
            'mobile-active': layoutState.mobileSidebar && isSidebarActive,
        }"
    >
        <AppTopbar />

        <AppSidebar />

        <div
            class="app-layout-mask"
            @click="toggleSidebar"
        />

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
import { onMounted, onUnmounted, ref } from 'vue'
import { useLayout } from './composables/useLayout'
import AppTopbar from './AppTopbar.vue'

const { isSidebarActive, layoutState, toggleSidebar } = useLayout()
</script>

<style scoped lang="scss">
.app-layout {
    @apply flex w-full;

    &-inactive &-container {
        @apply ml-0;
    }

    &-inactive &-sidebar {
        @apply -translate-x-full left-0;
    }

    &-container {
        @apply w-full flex flex-col min-h-screen;
        padding: 7rem 2rem;

        @media screen and (min-width: 768px) {
            margin-left: 28rem;
        }
    }

    &-main {
        @apply flex-1;
    }

    &-sidebar {
        @apply fixed z-[999] overflow-y-auto select-none -translate-x-full;

        top: 6rem;
        left: 0;
        transition:
            transform 0.4s cubic-bezier(0.05, 0.74, 0.2, 0.99),
            left 0.4s cubic-bezier(0.05, 0.74, 0.2, 0.99);

        @media screen and (min-width: 768px) {
            @apply left-20 translate-x-0;
        }
    }

    .mobile-active &-sidebar {
        @apply h-screen top-0 left-0 translate-x-0;
    }

    .mobile-active > &-mask {
        @apply fixed top-0 left-0 z-[998] w-full h-full bg-gray-600 bg-opacity-50;
    }
}
</style>
