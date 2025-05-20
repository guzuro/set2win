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
                :src="`http://localhost:3000/${player.avatarUrl}`"
                alt="Player"
                class="w-full h-full object-cover"
            />
        </div>

        <div :style="{ padding: `${token.padding}px` }">
            <h3 class="text-lg font-semibold text-gray-800 mb-2">
                <ManOutlined
                    v-if="player.sex === 'men'"
                    class="text-blue-400"
                />
                <WomanOutlined
                    v-else
                    class="text-pink-400"
                />
                {{ player.fullName }}
            </h3>
            <div class="flex items-center gap-2 text-sm text-gray-600">
                <img
                    :src="getCountryImage(player.country)"
                    alt="flag"
                    class="w-6 h-4 rounded-xs"
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
import { ManOutlined, WomanOutlined } from '@ant-design/icons-vue'
import type { RawPlayer } from '../types'
import { countries } from '../../../shared/includes/countries/countries'
import { getCountryImage } from '../../../shared/includes/countries/logic'

const { token } = theme.useToken()

defineProps<{
    player: RawPlayer
}>()
</script>
