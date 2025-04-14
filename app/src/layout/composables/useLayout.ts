import { computed, onMounted, onUnmounted, reactive } from 'vue'
import { useUserStore } from '@/stores/userStore'

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

    const isSidebarActive = computed(() => layoutState.sidebarVisible && userStore.isAuthenticated)

    const handleResize = () => {
        const isMobile = window.innerWidth < 768

        if (isMobile) {
            if (layoutState.sidebarVisible) toggleSidebar()
        } else {
            if (!layoutState.sidebarVisible) toggleSidebar()
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
        toggleSidebar,
    }
}
