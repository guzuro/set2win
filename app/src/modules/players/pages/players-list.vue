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
            <div
                v-else
                class="text-center"
            >
                <Button @click="drawerOpen = !drawerOpen"> Create your first player! </Button>

                <Drawer
                    v-model:visible="drawerOpen"
                    header="Create player"
                    position="right"
                    class="!w-full md:!w-[40rem]"
                >
                    <CreatePlayerForm />
                </Drawer>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { usePlayers } from '../composables/usePlayers'
import CreatePlayerForm from '../components/CreatePlayerForm.vue'

const { listLoading, getUserPlayers, list } = usePlayers()

const drawerOpen = ref(false)

onMounted(() => {
    getUserPlayers()
})
</script>

<style scoped></style>
