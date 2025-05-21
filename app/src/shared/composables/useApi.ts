import { ref } from 'vue'

export function useApi<T = any>() {
    const isLoading = ref(false)
    const data = ref<T | null>()
    const error = ref<Error | null>(null)

    async function resolve(reqFn: () => Promise<any>) {
        isLoading.value = true
        error.value = null
        data.value = null

        try {
            data.value = await reqFn()
        } catch (err: any) {
            error.value = err
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
