<template>
    <div class="auth-sign-in">
        <ACard title="Sign in">
            <FormBuilder
                :form="signInData"
                layout="vertical"
                :rules="rules"
                @form-submit="signIn"
            />

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
import type { FormBuilderData } from '@/shared/components/FormBuilder/types'
import type { SignInData } from '@/modules/auth/types/auth.types'
import type { FormResolverOptions } from '@primevue/forms'
import FormBuilder from '@/shared/components/FormBuilder/FormBuilder.vue'
import useAuth from '../composables/useAuth'

const { signIn, isLoading, rules } = useAuth()

const signInData: FormBuilderData<SignInData> = {
    initialModel: {
        login: '',
        password: '',
    },
    schema: [
        {
            type: 'Simple',
            field: {
                type: 'Text',
                label: 'Login',
                model: 'login',
            },
        },
        {
            type: 'Simple',
            field: {
                type: 'Password',
                label: 'Password',
                model: 'password',
            },
        },
    ],
    submit: {
        label: 'Sign in',
        loading: isLoading,
    },
}
</script>

<style></style>
