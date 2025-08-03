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
        <ul v-else>
            <li
                v-for="player in rankingsData?.players"
                :key="player.id"
            >
                <ACard size="small">
                    {{ player }}

                    <Avatar :src="`http://localhost:3000/${player.avatarUrl}`" />
                </ACard>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { usePlayers } from '../composables/usePlayers'
import { Avatar } from 'ant-design-vue'

const { getRankings, rankingsData, rankingsLoading } = usePlayers()

onMounted(() => {
    getRankings()
})
</script>

<style scoped></style>
