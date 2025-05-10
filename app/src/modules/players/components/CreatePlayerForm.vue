<template>
    <div class="create-player-form">
        <AForm
            :model="formState"
            layout="vertical"
        >
            <AFormItem
                label="Full name"
                name="fullName"
            >
                <AInput v-model:value="formState.fullName" />
            </AFormItem>
            <AFormItem
                label="Country"
                name="country"
            >
                <ASelect
                    v-model:value="formState.country"
                    option-label-prop="children"
                >
                    <ASelectOption
                        v-for="o in countriesList"
                        :value="o.value"
                        :label="o.label"
                    >
                        <img
                            class="inline-block w-5 h-5 rounded-full align-text-bottom mr-2"
                            :src="`https://flags.fmcdn.net/data/flags/mini/${o.value.toLowerCase()}.png`"
                        />
                        <span>{{ o.label }}</span>
                    </ASelectOption>
                </ASelect>
            </AFormItem>
            <div class="grid grid-cols-2 gap-5">
                <AFormItem
                    label="Birth date"
                    name="birthDate"
                >
                    <ADatePicker
                        v-model:value="formState.birthDate"
                        class="w-full"
                    />
                </AFormItem>

                <AFormItem
                    label="Hand"
                    name="hand"
                >
                    <ASegmented
                        v-model:value="formState.hand"
                        :options="['Left', 'Right']"
                    />
                </AFormItem>
            </div>
            <AFormItem
                label="Favourite surface"
                name="favoriteSurface"
            >
                <ASelect
                    v-model:value="formState.favoriteSurface"
                    option-label-prop="children"
                >
                    <ASelectOption
                        v-for="o in surfaceOptions"
                        :value="o.value"
                        :label="o.label"
                    >
                        <span
                            class="inline-block w-5 h-5 rounded-full align-text-bottom mr-2"
                            role="img"
                            :aria-label="o.label"
                            :class="{
                                'bg-blue-600': o.value === 'hard',
                                'bg-green-600': o.value === 'grass',
                                'bg-orange-600': o.value === 'clay',
                            }"
                        />
                        <span>{{ o.label }}</span>
                    </ASelectOption>
                </ASelect>
            </AFormItem>
            <AFormItem
                label="Avatar"
                name="avatar"
            ></AFormItem>

            <AFormItem>
                <AButton
                    html-type="submit"
                    type="primary"
                >
                    Create
                </AButton>
            </AFormItem>
        </AForm>
        <!-- <FormBuilder :form="createPlayerForm">
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
        </FormBuilder> -->
    </div>
</template>

<script setup lang="ts">
import { countries } from '@/shared/includes/countries'
import { surfaceOptions } from '@/shared/includes/surfaceOptions'
import { usePlayers } from '../composables/usePlayers'

const { getRawPlayerModel } = usePlayers()

const formState = getRawPlayerModel()

const countriesList = Object.entries(countries).map(([k, v]) => ({ label: v, value: k }))

// const createPlayerForm: FormBuilderData<any> = {
//     initialModel: {
//         fullName: '',
//         country: '',
//         birthDate: '',
//         hand: 'right',
//         favoriteSurface: 'clay',
//         avatar: null,
//     },
//     schema: [
//         {
//             type: 'Container',
//             fields: [
//                 {
//                     type: 'Simple',
//                     field: {
//                         type: 'Text',
//                         model: 'fullName',
//                         label: 'Player name',
//                     },
//                 },
//                 {
//                     type: 'Simple',
//                     field: {
//                         type: 'FileUpload',
//                         model: 'avatar',
//                         label: 'Player avatar',
//                         attrs: {
//                             accept: 'image/*',
//                             mode: 'basic',
//                         },
//                     },
//                 },
//             ],
//         },

//         {
//             type: 'Simple',
//             field: {
//                 type: 'DatePicker',
//                 model: 'birthDate',
//                 label: 'Birth date',
//                 attrs: {
//                     dateFormat: 'dd.mm.yy',
//                     fluid: true,
//                 },
//             },
//         },
//         {
//             type: 'Simple',
//             field: {
//                 type: 'Select',
//                 model: 'country',
//                 label: 'Country',
//                 attrs: {
//                     virtualScrollerOptions: { itemSize: 38 },
//                     options: Object.entries(countries).map(([k, v]) => ({ label: v, value: k })),
//                     optionLabel: 'label',
//                     optionValue: 'value',
//                 },
//             },
//         },
//         {
//             type: 'Simple',
//             field: {
//                 type: 'Select',
//                 model: 'favoriteSurface',
//                 label: 'Favorite surface',
//                 attrs: {
//                     options: [...surfaceOptions],
//                     optionLabel: 'label',
//                     optionValue: 'value',
//                 },
//             },
//         },
//     ],
//     submit: { label: 'Create player' },
// }
</script>

<style scoped></style>
