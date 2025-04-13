import { defineStore } from 'pinia'

type State = {
    user: any
}

export const useUserStore = defineStore('userStore', {
    state: (): State => ({
        user: null,
    }),
    getters: {
        isAuthenticated: (state) => !!state.user,
    },
})
