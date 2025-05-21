import { computed, onMounted, onUnmounted, reactive } from 'vue'
import { useUserStore } from '@/modules/user/store/userStore'

const layoutState = reactive({
    sidebarVisible: true,
    mobileSidebar: window.innerWidth < 768,
})

export function useLayout() {
    const userStore = useUserStore()

    function toggleSidebar() {
        layoutState.sidebarVisible = !layoutState.sidebarVisible

        layoutState.mobileSidebar = window.innerWidth < 768
    }

    const needRenderSidebar = computed(() => userStore.isAuthenticated)

    const isSidebarActive = computed(() => layoutState.sidebarVisible && needRenderSidebar.value)

    const handleResize = () => {
        const isMobile = window.innerWidth < 768

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
