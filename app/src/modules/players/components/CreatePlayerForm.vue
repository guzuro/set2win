<template>
    <div class="create-player-form">
        <FormBuilder
            :form="createPlayerForm"
            :resolver="createPlayer"
        />
    </div>
</template>

<script setup lang="ts">
import FormBuilder from '@/shared/components/FormBuilder/FormBuilder.vue'
import type { FormBuilderData } from '@/shared/components/FormBuilder/types'
import type { FormResolverOptions } from '@primevue/forms'

const createPlayerForm: FormBuilderData<any> = {
    model: {
        fullName: '',
        country: '',
        birthDate: '',
        hand: 'right',
        favoriteSurface: 'clay',
    },
    schema: [
        {
          type: 'Container',
          fields: [
            {
                type: 'Text',
                label: '111',
                model: 'fullName'
            },
            {
                type: 'Text',
                label: 'Country',
                model: 'country'
            }
          ]  
        },
        {
            type: 'Text',
            label: 'hand',
            model: 'hand    '
        }
    ],
    submit: { label: 'Create player' },
}

function createPlayer({ values }: FormResolverOptions) {
    const errors = {}
    return {
        values,
        errors,
    }
}
</script>

<style scoped></style>
