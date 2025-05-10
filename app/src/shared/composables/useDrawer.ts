import { useBreakpoints, breakpointsAntDesign } from '@vueuse/core'
import { ref, watch } from 'vue'

export function useDrawer(initWidth: string | number = '600px') {
    const drawerWidth = ref(initWidth)

    const breakpoints = useBreakpoints(breakpointsAntDesign)

    watch(
        breakpoints.current,
        (_) => (drawerWidth.value = breakpoints.greater('sm').value ? initWidth : '100%'),
        { deep: true },
    )

    return {
        drawerWidth,
    }
}
