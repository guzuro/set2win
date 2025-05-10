<template>
    <div class="auth-sign-up">
        <ACard title="Sign up">
            <AForm
                :model="formState"
                layout="vertical"
                :rules="rules"
                ref="formRef"
                @finish="signUp"
            >
                <AFormItem
                    label="Login"
                    name="login"
                >
                    <AInput v-model:value="formState.login" />
                </AFormItem>

                <AFormItem
                    label="Password"
                    name="password"
                >
                    <AInputPassword v-model:value="formState.password" />
                </AFormItem>

                <AFormItem
                    label="Confirm password"
                    name="passwordConfirm"
                    :rules="confirmPasswordRules"
                >
                    <AInputPassword v-model:value="formState.passwordConfirm" />
                </AFormItem>

                <AFormItem>
                    <AButton
                        :loading="isLoading"
                        html-type="submit"
                    >
                        Sign Up
                    </AButton>
                </AFormItem>
            </AForm>

            <div class="mt-5 text-center">
                Already have an account?
                <RouterLink
                    :to="{ name: 'SignIn' }"
                    class="text-blue-400"
                >
                    Sign In
                </RouterLink>
            </div>
        </ACard>
    </div>
</template>

<script setup lang="ts">
import type { FormInstance, Rule } from 'ant-design-vue/es/form'
import useAuth from '../composables/useAuth'
import { ref } from 'vue'

const { signUp, isLoading, rules, getSignUpModel } = useAuth()

const formRef = ref<FormInstance>()
const formState = getSignUpModel()

const confirmPasswordRules: Array<Rule> = [
    ...(rules.password ?? []),
    {
        validator: (_, value) => {
            const { password } =
                (formRef.value?.getFieldsValue() as ReturnType<typeof getSignUpModel>) ?? {}

            if (value !== password) {
                return Promise.reject(new Error('Passwords do not match!'))
            }

            return Promise.resolve()
        },
        trigger: 'blur',
    },
]
</script>

<style scoped></style>
