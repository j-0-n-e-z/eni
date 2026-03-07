import type { SerializedError } from '@reduxjs/toolkit'

import type { BackendError } from '@/frontend-types'
import { Icons } from '@/ui'
import { getErrorMessage } from '@/utils'

import { EmptyState } from '../EmptyState/EmptyState'

interface ErrorDisplayProps {
	error?: BackendError | SerializedError | undefined
}

export const ErrorDisplay = ({ error }: ErrorDisplayProps) => (
	<EmptyState
		description={getErrorMessage(error)}
		header='Error occured'
		icon={<Icons.Error />}
	/>
)
