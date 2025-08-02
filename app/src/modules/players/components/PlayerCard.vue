<template>
    <ACard
        hoverable
        class="player-card @container overflow-hidden relative"
        :body-style="{ padding: 0 }"
    >
        <ATag
            class="absolute left-2 top-2 rounded-full"
            color="blue"
        >
            #{{ player.rating }}
        </ATag>

        <div class="flex flex-col @sm:flex-row">
            <div
                v-if="player.avatarUrl"
                class="w-full @sm:w-2/5 h-64 @xl:h-80"
            >
                <img
                    :src="`http://localhost:3000/${player.avatarUrl}`"
                    alt="Player"
                    class="w-full h-full object-cover"
                />
            </div>

            <div
                class="w-full lg:w-3/5 flex flex-col gap-3"
                :style="{ padding: `${token.padding}px` }"
            >
                <h3 class="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <ManOutlined
                        v-if="player.sex === 'male'"
                        class="text-blue-400"
                    />
                    <WomanOutlined
                        v-else
                        class="text-pink-400"
                    />
                    {{ player.fullName }}
                </h3>

                <div class="flex items-center gap-2 text-gray-600">
                    <img
                        :src="getCountryImage(player.country)"
                        alt="flag"
                        class="w-6 h-4 rounded-xs"
                    />
                    <span class="font-medium">{{ countries[player.country] }}</span>
                </div>
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
