<template>
    <div class="auth-sign-in">
        <ACard title="Sign in">
            <AForm
                :model="formState"
                layout="vertical"
                :rules="rules"
                ref="formRef"
                @finish="signIn"
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

                <AFormItem>
                    <AButton
                        :loading="isLoading"
                        html-type="submit"
                    >
                        Sign In
                    </AButton>
                </AFormItem>
            </AForm>

            <div class="mt-5 text-center">
                Dont have an account?
                <RouterLink
                    :to="{ name: 'SignUp' }"
                    class="text-blue-400"
                >
                    Sign Up
                </RouterLink>
            </div>
        </ACard>
    </div>
</template>

<script setup lang="ts">
import useAuth from '../composables/useAuth'
import type { FormInstance } from 'ant-design-vue/es/form'
import { ref } from 'vue'

const { signIn, isLoading, rules, getSignInModel } = useAuth()
const formRef = ref<FormInstance>()

const formState = getSignInModel()
</script>

<style></style>
