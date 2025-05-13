<template>
    <div class="players-list">
        <ASpin
            v-if="listLoading"
            class="players-list-spinner !w-10 !h-10"
        />

        <template v-else>
            <template v-if="list?.players?.length">
                <ACard v-for="player in list.players">
                    {{ player }}
                </ACard>
            </template>
            <div
                v-else
                class="text-center"
            >
                <AButton
                    type="primary"
                    @click="drawerOpen = !drawerOpen"
                >
                    Create your first player!
                </AButton>

                <ADrawer
                    v-model:open="drawerOpen"
                    title="Create player"
                    position="right"
                    :width="drawerWidth"
                >
                    <ASpin :spinning="playerCreating">
                        <CreatePlayerForm @submit="createPlayer" />
                    </ASpin>
                </ADrawer>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { usePlayers } from '../composables/usePlayers'
import CreatePlayerForm from '../components/CreatePlayerForm.vue'
import { useDrawer } from '../../../shared/composables/useDrawer'

const { listLoading, getUserPlayers, list, createPlayer, playerCreating } = usePlayers()
const { drawerWidth } = useDrawer()

const drawerOpen = ref(false)

onMounted(() => {
    getUserPlayers()
})
</script>

<style scoped></style>
