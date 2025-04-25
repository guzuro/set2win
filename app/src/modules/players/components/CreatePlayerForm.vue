<template>
    <div class="create-player-form">
        <FormBuilder
            :form="createPlayerForm"
            :resolver="createPlayer"
        >
            <template #country="{ field, error }">
                <SelectInput
                    v-if="field.type === 'Select'"
                    :name="field.model"
                    :label="field.label"
                    :error="error"
                    v-bind="field.attrs"
                >
                    <template #option="slotProps">
                        <div class="flex items-center gap-2">
                            <img
                                :alt="slotProps.option.label"
                                :src="`https://flags.fmcdn.net/data/flags/mini/${slotProps.option.value.toLowerCase()}.png`"
                                style="width: 18px"
                            />
                            <div>{{ slotProps.option.label }}</div>
                        </div>
                    </template>
                </SelectInput>
            </template>
        </FormBuilder>
    </div>
</template>

<script setup lang="ts">
import FormBuilder from '@/shared/components/FormBuilder/FormBuilder.vue'
import type { FormBuilderData } from '@/shared/components/FormBuilder/types'
import { countryList } from '@/shared/includes/countriesList'
import type { FormResolverOptions } from '@primevue/forms'
import SelectInput from '@/shared/components/controls/SelectInput.vue'

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
            type: 'Simple',
            field: {
                type: 'Text',
                model: 'fullName',
                label: 'Player name',
            },
        },
        {
            type: 'Simple',
            field: {
                type: 'Select',
                model: 'country',
                label: 'Country',
                attrs: {
                    virtualScrollerOptions: { itemSize: 38 },
                    options: Object.entries(countryList).map(([k, v]) => ({ label: v, value: k })),
                    optionLabel: 'label',
                    optionValue: 'value',
                },
            },
        },
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
