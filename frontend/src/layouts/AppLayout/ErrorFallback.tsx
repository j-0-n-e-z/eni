import { EmptyState, Icons } from '@/ui'

interface ErrorFallbackProps {
	error: Error
}

export const ErrorFallback = ({ error }: ErrorFallbackProps) => (
	<EmptyState
		description={error.message}
		header='Error occured'
		icon={<Icons.EmptyIcon />}
	/>
)
