<template>
    <div class="create-player-form">
        <AForm
            :model="formState"
            layout="vertical"
            :rules="createFormValidationRules"
            @finish="handleForm"
        >
            <div class="grid grid-cols-1 md:grid-cols-2 md:gap-5">
                <AFormItem
                    label="Full name"
                    name="fullName"
                >
                    <AInput v-model:value="formState.fullName" />
                </AFormItem>
                <AFormItem
                    label="Sex"
                    name="sex"
                >
                    <ASegmented
                        v-model:value="formState.sex"
                        :options="sexOptions"
                    >
                        <template #label="{ value }">
                            <span class="capitalize">{{ value }}</span>
                        </template>
                    </ASegmented>
                </AFormItem>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 md:gap-5">
                <AFormItem
                    label="Birth date"
                    name="birthDate"
                >
                    <ADatePicker
                        v-model:value="formState.birthDate"
                        class="w-full"
                        :disabled-date="disabledDate"
                    />
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
                                class="inline-block w-6 h-4 rounded-xs align-text-bottom mr-2"
                                :src="getCountryImage(o.value)"
                            />
                            <span>{{ o.label }}</span>
                        </ASelectOption>
                    </ASelect>
                </AFormItem>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 md:gap-5">
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
                                class="inline-block w-6 h-4 rounded-xs align-text-bottom mr-2"
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
                    label="Hand"
                    name="hand"
                >
                    <ASegmented
                        v-model:value="formState.hand"
                        :options="handOptions"
                    >
                        <template #label="{ value }">
                            <span class="capitalize">{{ value }}</span>
                        </template>
                    </ASegmented>
                </AFormItem>
            </div>

            <AFormItem
                label="Avatar"
                name="avatarUrl"
            >
                <AUpload
                    :multiple="false"
                    list-type="picture"
                    :max-count="1"
                    action="http://localhost:3000/api/upload/avatar"
                    with-credentials
                    v-model:file-list="avatarFileList"
                    @change="handleChange"
                >
                    <AButton v-if="!formState.avatarUrl">
                        <UploadOutlined></UploadOutlined>
                        Choose avatar
                    </AButton>
                </AUpload>
            </AFormItem>

            <AFormItem>
                <AButton
                    html-type="submit"
                    type="primary"
                >
                    Create
                </AButton>
            </AFormItem>
        </AForm>
    </div>
</template>

<script setup lang="ts">
import { countries } from '@/shared/includes/countries/countries'
import { surfaceOptions } from '@/shared/includes/surface/surfaceOptions'
import { usePlayers } from '../composables/usePlayers'
import { UploadOutlined } from '@ant-design/icons-vue'
import { ref } from 'vue'
import type { UploadChangeParam, UploadFile } from 'ant-design-vue'
import { handOptions, sexOptions } from '../includes/options'
import type { CreatePlayerDto } from '../types'
import { getCountryImage } from '../../../shared/includes/countries/logic'
import dayjs, { Dayjs } from 'dayjs'

const emits = defineEmits<{
    submit: [CreatePlayerDto]
}>()

const { getRawPlayerModel, createFormValidationRules } = usePlayers()
const formState = getRawPlayerModel()

const countriesList = Object.entries(countries).map(([k, v]) => ({ label: v, value: k }))

const avatarFileList = ref<Array<UploadFile>>([])

const handleChange = (info: UploadChangeParam) => {
    const status = info.file.status

    if (status === 'done' && info.file.response?.url) {
        formState.avatarUrl = info.file.response.url
    }
}

const handleForm = (values: CreatePlayerDto) => {
    emits('submit', values)
}

const resetForm = () => {
    Object.assign(formState, getRawPlayerModel())
    avatarFileList.value = []
}

defineExpose({
    resetForm,
})

const disabledDate = (current: Dayjs) => {
    return current && current > dayjs().endOf('day')
}
</script>

<style scoped></style>
