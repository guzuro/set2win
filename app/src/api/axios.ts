import router from '@/router'
import axios, {
    AxiosError,
    type AxiosInstance,
    type AxiosRequestConfig,
    type AxiosResponse,
} from 'axios'

class Api {
    private instance: AxiosInstance

    constructor(baseUrl: string) {
        this.instance = axios.create({ baseURL: baseUrl })

        this.instance.interceptors.response.use(
            (response: AxiosResponse) => response.data,
            this.handleErrors,
        )
    }

    private handleErrors(error: AxiosError) {
        if (error.response?.status === 401) {
            router.push({ name: 'SignIn' })
        }

        throw error
    }

    public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const requestConfig = { ...config }

        return (await this.instance.get<T>(url, requestConfig)) as unknown as Promise<T>
    }

    public async post<T, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
        const requestConfig = { ...config }

        return (await this.instance.post<T>(url, data, requestConfig)) as unknown as Promise<T>
    }
}

export const api = new Api('http://localhost:3000/api/')
