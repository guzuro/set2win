<template>
    <ACard
        hoverable
        class="player-card rounded-2xl overflow-hidden h-full"
        :body-style="{ padding: 0 }"
    >
        <div
            v-if="player.avatarUrl"
            class="w-full h-64 xl:h-72"
        >
            <img
                :src="`http://localhost:3000${player.avatarUrl}`"
                alt="Player"
                class="w-full h-full object-cover"
            />
        </div>

        <div :style="{ padding: `${token.padding}px` }">
            <h3 class="text-lg font-semibold text-gray-800 mb-2">
                {{ player.fullName }}
            </h3>
            <div class="flex items-center gap-2 text-sm text-gray-600">
                <img
                    :src="`https://flags.fmcdn.net/data/flags/mini/${player.country.toLowerCase()}.png`"
                    alt="flag"
                    class="w-6 h-4 rounded-md"
                />
                <span class="font-medium">{{ countries[player.country] }}</span>
                <ATag
                    class="ml-auto mr-0 rounded-full"
                    color="blue"
                >
                    #{{ player.rating }}
                </ATag>
            </div>
        </div>
    </ACard>
</template>

<script setup lang="ts">
import { theme } from 'ant-design-vue'
import type { RawPlayer } from '../types'
import { countries } from '../../../shared/includes/countries'

const { token } = theme.useToken()

defineProps<{
    player: RawPlayer
}>()
</script>
