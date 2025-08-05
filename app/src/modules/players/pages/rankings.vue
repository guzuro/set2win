<template>
    <div class="rankings">
        <APageHeader
            title="Rankings"
            class="pt-0"
        />

        <ASpin
            v-if="rankingsLoading"
            class="w-full"
        />
        <ATable
            v-else
            :dataSource="rankingsData?.players ?? []"
            :columns="columns"
        >
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'player'">
                    <div class="flex items-center gap-2">
                        <div class="relative">
                            <Avatar
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
import { onMounted } from 'vue'
import { usePlayers } from '../composables/usePlayers'
import type { ColumnsType } from 'ant-design-vue/es/table'
import { Avatar } from 'ant-design-vue'
import CountryFlag from '@/shared/components/controls/components/CountryFlag.vue'
import { getPlayerAvatarUrl } from '../includes/logic'

const { getRankings, rankingsData, rankingsLoading } = usePlayers()

const columns: ColumnsType = [
    {
        title: 'Rank',
        dataIndex: 'rating',
        key: 'rank',
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
]

onMounted(() => {
    getRankings()
})
</script>

<style scoped></style>
