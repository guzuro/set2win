<template>
    <ACard
        class="app-layout-sidebar"
        size="small"
    >
        <AMenu
            :items="items"
            class="!border-none"
            @click="handleClick"
        />
    </ACard>
</template>

<script setup lang="ts">
import { TeamOutlined } from '@ant-design/icons-vue'
import type { ItemType, MenuProps } from 'ant-design-vue'
import { h, ref } from 'vue'
import { useRouter } from 'vue-router'

const { push } = useRouter()

const items = ref<Array<ItemType>>([
    {
        key: '/players',
        label: 'Players',
        icon: () => h(TeamOutlined),
    },
])

const handleClick: MenuProps['onClick'] = (e) => {
    push(e.key.toString())
}
</script>

<style scoped lang="scss">
.app-layout-sidebar {
    @apply w-full max-w-96;

    height: calc(100vh - 10rem);
}
</style>
