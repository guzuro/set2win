<template>
    <div class="players-list">
        <div
            v-if="listLoading"
            class="players-list-spinner text-center"
        >
            <ProgressSpinner class="!w-10 !h-10" />
        </div>
        <template v-else>
            <template v-if="list?.length">
                <Card v-for="player in list">
                    <template #content>
                        {{ player }}
                    </template>
                </Card>
            </template>
            <template v-else> Create your first player! </template>
        </template>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { usePlayers } from '../composables/usePlayers'

const { listLoading, getUserPlayers, list } = usePlayers()

onMounted(() => {
    getUserPlayers()
})
</script>

<style scoped></style>
