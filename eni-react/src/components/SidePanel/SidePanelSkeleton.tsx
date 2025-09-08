import { DarkSkeleton } from '@/components'

export const SidePanelSkeleton = () => (
	<DarkSkeleton
		height='100vh'
		style={{ left: 0, position: 'fixed', top: 0 }}
		width='80px'
	/>
)
