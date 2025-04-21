<template>
    <FieldWrapper
        class="text-input"
        :error="error"
        :help-message="helpMessage"
        :label="label"
    >
        <InputText
            :id="label"
            v-model="model"
            :name="name"
            :aria-describedby="`${label}-help`"
        />
    </FieldWrapper>
</template>

<script setup lang="ts">
import FieldWrapper from './components/FieldWrapper.vue'

const model = defineModel<string>()

defineProps<{
    label: string
    helpMessage?: string
    error?: string
    name?: string
}>()
</script>

<style scoped></style>
