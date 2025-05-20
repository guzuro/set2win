<template>
    <div class="app-topbar">
        <div class="app-topbar-inner">
            <AButton
                v-if="needRenderSidebar"
                class="app-topbar__toggle"
                aria-label="Toggle sidebar"
                @click="toggleSidebar"
            >
                <template #icon> <MenuOutlined /> </template>
            </AButton>

            <RouterLink
                to="/"
                class="app-topbar__title"
            >
                Set2Win
            </RouterLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useLayout } from './composables/useLayout'
import { MenuOutlined } from '@ant-design/icons-vue'

const { toggleSidebar, needRenderSidebar } = useLayout()
</script>

<style scoped lang="scss">
.app-topbar {
    @apply fixed top-0 bg-white p-4 left-0 right-0 h-20 z-50;

    &-inner {
        @apply px-3 md:px-10 h-full gap-2 flex items-center;
    }

    &__title {
        @apply text-2xl hover:opacity-75;
    }
}
</style>
