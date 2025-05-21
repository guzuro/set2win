import { computed, onMounted, onUnmounted, reactive } from 'vue'
import { useUserStore } from '@/modules/user/store/userStore'

const MD_BREAKPOINT = 768

const layoutState = reactive({
    sidebarVisible: window.innerWidth > MD_BREAKPOINT,
    mobileSidebar: window.innerWidth < MD_BREAKPOINT,
})

export function useLayout() {
    const userStore = useUserStore()

    function toggleSidebar() {
        layoutState.sidebarVisible = !layoutState.sidebarVisible

        layoutState.mobileSidebar = window.innerWidth < MD_BREAKPOINT
    }

    const needRenderSidebar = computed(() => userStore.isAuthenticated)

    const isSidebarActive = computed(() => layoutState.sidebarVisible && needRenderSidebar.value)

    const handleResize = () => {
        const isMobile = window.innerWidth < MD_BREAKPOINT

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
