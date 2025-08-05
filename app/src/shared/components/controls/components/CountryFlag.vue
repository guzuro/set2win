<template>
    <div class="country-flag flex items-center gap-2 text-gray-600">
        <img
            :src="getCountryImage(country)"
            :alt="`${countries[country]} flag`"
            :title="`${countries[country]} flag`"
            class="w-6 h-4 rounded-xs"
        />
        <span
            v-if="hasTitle"
            class="font-medium"
        >
            {{ countries[country] }}
        </span>
    </div>
</template>

<script setup lang="ts">
import { getCountryImage } from '../../../includes/countries/logic'
import { countries } from '../../../includes/countries/countries'

const { country, hasTitle = true } = defineProps<{
    country: string
    hasTitle?: boolean
}>()
</script>

<style scoped></style>
