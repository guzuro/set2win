import { computed, onMounted, onUnmounted, reactive } from 'vue'
import { useUserStore } from '@/modules/user/store/userStore'
import { theme } from 'ant-design-vue'

let XL_BREAKPOINT = -1

const layoutState = reactive({
    sidebarVisible: window.innerWidth > XL_BREAKPOINT,
    mobileSidebar: window.innerWidth < XL_BREAKPOINT,
})

export function useLayout() {
    const { token } = theme.useToken()

    XL_BREAKPOINT = token.value.screenXL

    const userStore = useUserStore()

    function toggleSidebar() {
        layoutState.sidebarVisible = !layoutState.sidebarVisible

        layoutState.mobileSidebar = window.innerWidth < XL_BREAKPOINT
    }

    const needRenderSidebar = computed(() => userStore.isAuthenticated)

    const isSidebarActive = computed(() => layoutState.sidebarVisible && needRenderSidebar.value)

    const handleResize = () => {
        const isMobile = window.innerWidth < XL_BREAKPOINT

        if (isMobile && layoutState.sidebarVisible && !layoutState.mobileSidebar) {
            layoutState.sidebarVisible = false
        }

        if (!isMobile && layoutState.mobileSidebar) {
            layoutState.sidebarVisible = true
        }

        layoutState.mobileSidebar = isMobile
    }

    onMounted(() => {
        window.addEventListener('resize', handleResize)
        
        handleResize()
    })

    onUnmounted(() => {
        window.removeEventListener('resize', handleResize)
    })

    return {
        layoutState,
        isSidebarActive,
        needRenderSidebar,
        toggleSidebar,
    }
}
