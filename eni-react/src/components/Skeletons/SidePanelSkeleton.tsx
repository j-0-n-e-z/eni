import { DarkSkeleton } from '@/components'

export const SidePanelSkeleton = () => (
	<DarkSkeleton
		height='100vh'
		style={{ position: 'fixed', top: 0, left: 0 }}
		width='80px'
	/>
)
