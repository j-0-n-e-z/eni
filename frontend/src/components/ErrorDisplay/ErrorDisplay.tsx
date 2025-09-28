import type { SerializedError } from '@reduxjs/toolkit'
import type { FC } from 'react'

import { EmptyState } from '@/components'
import { ErrorIcon } from '@/icons'
import type { BackendError } from '@/store/api'
import { getErrorMessage } from '@/utils'

interface ErrorDisplayProps {
	error: BackendError | SerializedError | undefined
}

export const ErrorDisplay: FC<ErrorDisplayProps> = ({ error }) => (
	<EmptyState
		description={getErrorMessage(error)}
		header='Error occured'
		icon={<ErrorIcon />}
	/>
)
