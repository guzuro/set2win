<template>
    <div class="create-player-form">
        <FormBuilder :form="createPlayerForm">
            <template #country="{ field, error }">
                <SelectInput
                    v-if="field.type === 'Select'"
                    :name="field.model"
                    :label="field.label"
                    :error="error"
                    v-bind="field.attrs"
                >
                    <template #option="{ option }">
                        <div class="flex items-center gap-2">
                            <img
                                :alt="option.label"
                                class="w-5 h-5 rounded-full"
                                :src="`https://flags.fmcdn.net/data/flags/mini/${option.value.toLowerCase()}.png`"
                            />
                            <span>{{ option.label }}</span>
                        </div>
                    </template>
                </SelectInput>
            </template>
            <template #favoriteSurface="{ field, error }">
                <SelectInput
                    v-if="field.type === 'Select'"
                    :name="field.model"
                    :label="field.label"
                    :error="error"
                    v-bind="field.attrs"
                >
                    <template #option="{ option }">
                        <div class="flex items-center gap-2">
                            <div
                                class="w-5 h-5 rounded-full"
                                :class="{
                                    'bg-blue-600': option.value === 'hard',
                                    'bg-green-600': option.value === 'grass',
                                    'bg-orange-600': option.value === 'clay',
                                }"
                            />
                            <span>{{ option.label }}</span>
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
import { countries } from '@/shared/includes/countries'
import type { FormResolverOptions } from '@primevue/forms'
import SelectInput from '@/shared/components/controls/SelectInput.vue'
import { surfaceOptions } from '@/shared/includes/surfaceOptions'

const createPlayerForm: FormBuilderData<any> = {
    initialModel: {
        fullName: '',
        country: '',
        birthDate: '',
        hand: 'right',
        favoriteSurface: 'clay',
        avatar: null,
    },
    schema: [
        {
            type: 'Container',
            fields: [
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
                        type: 'FileUpload',
                        model: 'avatar',
                        label: 'Player avatar',
                        attrs: {
                            accept: 'image/*',
                            mode: 'basic',
                        },
                    },
                },
            ],
        },

        {
            type: 'Simple',
            field: {
                type: 'DatePicker',
                model: 'birthDate',
                label: 'Birth date',
                attrs: {
                    dateFormat: 'dd.mm.yy',
                    fluid: true,
                },
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
                    options: Object.entries(countries).map(([k, v]) => ({ label: v, value: k })),
                    optionLabel: 'label',
                    optionValue: 'value',
                },
            },
        },
        {
            type: 'Simple',
            field: {
                type: 'Select',
                model: 'favoriteSurface',
                label: 'Favorite surface',
                attrs: {
                    options: [...surfaceOptions],
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
