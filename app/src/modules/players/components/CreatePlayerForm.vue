<template>
    <div class="create-player-form">
        <AForm
            :model="formState"
            layout="vertical"
        >
            <div class="grid grid-cols-1 md:grid-cols-2 md:gap-5">
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
            </div>
            <AFormItem
                label="Birth date"
                name="birthDate"
            >
                <ADatePicker
                    v-model:value="formState.birthDate"
                    class="w-full"
                />
            </AFormItem>

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
                label="Avatar"
                name="avatar"
            >
                <AUpload
                    :multiple="false"
                    list-type="picture"
                    :max-count="1"
                    :before-upload="() => false"
                    v-model:file-list="avatarFileList"
                >
                    <a-button v-if="!formState.avatar">
                        <UploadOutlined></UploadOutlined>
                        Choose avatar
                    </a-button>
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
import { countries } from '@/shared/includes/countries'
import { surfaceOptions } from '@/shared/includes/surfaceOptions'
import { usePlayers } from '../composables/usePlayers'
import { UploadOutlined } from '@ant-design/icons-vue'
import { ref, watch } from 'vue'
import type { UploadFile } from 'ant-design-vue'

const { getRawPlayerModel } = usePlayers()

const formState = getRawPlayerModel()

const countriesList = Object.entries(countries).map(([k, v]) => ({ label: v, value: k }))

const avatarFileList = ref<Array<UploadFile>>([])

watch(avatarFileList, (v) => {
    if (v.length) {
        formState.avatar = v[0]
    } else {
        formState.avatar = null
    }
})
</script>

<style scoped></style>
