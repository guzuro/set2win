import { UserApi } from '@/api/user.api'
import { defineStore } from 'pinia'

type State = {
    user: any
}

export const useUserStore = defineStore('userStore', {
    state: (): State => ({
        user: null,
    }),
    actions: {
        async getUser() {
            try {
                this.user = await UserApi.getUser()
            } catch (error) {
                console.error(error);
                
                throw error
            }
        },
    },
    getters: {
        isAuthenticated: (state) => !!state.user,
    },
})
