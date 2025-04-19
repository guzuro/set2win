<template>
    <Card class="app-layout-sidebar">
        <template #content>
            <Menu
                :model="items"
                class="!border-none"
            >
                <template #item="{ item, props }">
                    <router-link
                        v-slot="{ href, navigate }"
                        :to="{
                            path: item.url,
                        }"
                    >
                        <a
                            :href="href"
                            v-bind="props.action"
                            @click="navigate"
                        >
                            <span :class="item.icon" />
                            <span class="ml-2">{{ item.label }}</span>
                        </a>
                    </router-link>
                </template>
            </Menu>
        </template>
    </Card>
</template>

<script setup lang="ts">
import type { MenuItem } from 'primevue/menuitem'
import { ref } from 'vue'

const items = ref<Array<MenuItem>>([
    {
        label: 'Players',
        icon: 'pi pi-palette',
        url: '/players',
    },
])
</script>

<style scoped lang="scss">
.app-layout-sidebar {
    @apply w-full max-w-96;

    height: calc(100vh - 10rem);
}

.router-link-exact-active {
    .p-menu-item-link {
        color: var(--p-menu-item-focus-color);
        background: var(--p-menu-item-focus-background);
    }
}
</style>
