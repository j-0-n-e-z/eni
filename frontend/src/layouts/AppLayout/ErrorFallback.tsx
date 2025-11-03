import { EmptyIcon, EmptyState } from '@/ui'

export const ErrorFallback = ({ error }: { error: Error }) => (
	<EmptyState
		description={error.message}
		header='Error occured'
		icon={<EmptyIcon />}
	/>
)
