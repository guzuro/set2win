<template>
    <div class="players-list">
        <APageHeader
            title="Your players"
            class="pt-0"
        >
            <template
                #extra
                v-if="list?.players.length"
            >
                <AButton
                    type="primary"
                    @click="drawerOpen = !drawerOpen"
                >
                    Add player
                </AButton>
            </template>
        </APageHeader>

        <ASpin
            v-if="listLoading"
            class="players-list-spinner !w-10 !h-10"
        />

        <template v-else>
            <ARow
                v-if="list?.players?.length"
                :gutter="[16, 16]"
            >
                <ACol
                    v-for="player in list.players"
                    :xs="24"
                    :md="12"
                    :xxl="8"
                >
                    <PlayerCard :player="player" />
                </ACol>
            </ARow>
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
            </div>
        </template>

        <ADrawer
            v-model:open="drawerOpen"
            title="Create player"
            position="right"
            :width="drawerWidth"
        >
            <ASpin :spinning="playerCreating">
                <CreatePlayerForm
                    ref="formRef"
                    @submit="submitForm"
                />
            </ASpin>
        </ADrawer>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { usePlayers } from '../composables/usePlayers'
import CreatePlayerForm from '../components/CreatePlayerForm.vue'
import { useDrawer } from '../../../shared/composables/useDrawer'
import ARow from 'ant-design-vue/es/grid/Row'
import PlayerCard from '../components/PlayerCard.vue'
import { templateRef } from '@vueuse/core'
import type { CreatePlayerDto } from '../types'

const drawerOpen = ref(false)

const { listLoading, getUserPlayers, list, createPlayer, createError, playerCreating } =
    usePlayers()
const { drawerWidth } = useDrawer()

const formRef = templateRef('formRef')

const submitForm = async (player: CreatePlayerDto) => {
    await createPlayer(player)

    if (!createError.value) {
        formRef.value?.resetForm()

        drawerOpen.value = false
    }
}

onMounted(() => {
    getUserPlayers()
})
</script>

<style scoped></style>
