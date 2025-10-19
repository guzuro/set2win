<template>
    <div class="rankings">
        <APageHeader
            title="Rankings"
            class="pt-0"
        />

        <ASpin
            v-if="isLoading"
            class="w-full"
        />
        <ATable
            v-if="data"
            :dataSource="data.players"
            :columns="columns"
            :pagination="{
                current: page,
                total: data.total,
                'onUpdate:current'(page) {
                    onPageChange(page)
                },
            }"
        >
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'player'">
                    <div class="flex items-center gap-2">
                        <div class="relative">
                            <AAvatar
                                shape="circle"
                                size="large"
                                :src="getPlayerAvatarUrl(record.avatarUrl)"
                            />

                            <CountryFlag
                                class="absolute -top-1 -right-2"
                                :country="record.country"
                                :has-title="false"
                            />
                        </div>

                        <b>
                            {{ record.fullName }}
                        </b>
                    </div>
                </template>
            </template>
        </ATable>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import type { ColumnsType } from 'ant-design-vue/es/table'
import CountryFlag from '@/shared/components/controls/components/CountryFlag.vue'
import { getPlayerAvatarUrl } from '../includes/logic'
import { useRanks } from '../composables/useRanks'
import { useRoute, useRouter } from 'vue-router'

const columns: ColumnsType = [
    {
        title: 'Rank',
        dataIndex: 'rating',
        key: 'rank',
        width: 30,
    },
    {
        title: 'Player',
        key: 'player',
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Points',
        dataIndex: 'points',
        key: 'points',
    },
]

const { getRankings, data, isLoading } = useRanks()

const route = useRoute()
const router = useRouter()

const page = computed<number>({
    get: () => {
        const page = route.query['page']

        if (!page) {
            return 1
        } else if (typeof page === 'string') {
            return +page
        }

        return +page
    },
    set: (page) => {
        router.replace({
            query: {
                ...route.params,
                page,
            },
        })
    },
})

const onPageChange = (_page: number) => {
    page.value = _page

    getRankings(_page)
}

onMounted(() => {
    getRankings(+page.value)
})
</script>

<style scoped></style>
