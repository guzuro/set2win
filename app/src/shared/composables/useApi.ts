import { ref } from 'vue'

export function useApi<T = any>() {
    const isLoading = ref(false)
    let data = ref<T | null>()
    const error = ref<Error | null>(null)

    async function resolve(reqFn: () => Promise<any>) {
        isLoading.value = true
        error.value = null
        data.value = null

        try {
            data.value = await reqFn()
        } catch (error: any) {
            error.value = error
        } finally {
            isLoading.value = false
        }
    }

    return {
        isLoading,
        data,
        error,
        resolve,
    }
}
