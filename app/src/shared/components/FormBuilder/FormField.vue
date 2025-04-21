<template>
    <div class="form-field">
        <TextInput
                    v-if="field.type === 'Text'"
                    :name="field.model"
                    :label="field.label"
                    :error="error"
                />
                <PasswordInput
                    v-if="field.type === 'Password'"
                    :name="field.model"
                    :label="field.label"
                    :error="error"
                />
    </div>
</template>

<script setup lang="ts">
import TextInput from '../controls/TextInput.vue';
import PasswordInput from '../controls/PasswordInput.vue';
import type { FormFields } from './types';


defineProps<{
    field: FormFields
    error?: string
}>()
</script>

<style scoped>

</style>