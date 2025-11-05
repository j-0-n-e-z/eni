import type { SerializedError } from '@reduxjs/toolkit'
import type { FC } from 'react'

import type { BackendError } from '@/frontend-types'
import { Icons } from '@/ui/icons'
import { getErrorMessage } from '@/utils'

import { EmptyState } from '../EmptyState'

interface ErrorDisplayProps {
	error: BackendError | SerializedError | undefined
}

export const ErrorDisplay: FC<ErrorDisplayProps> = ({ error }) => (
	<EmptyState
		description={getErrorMessage(error)}
		header='Error occured'
		icon={<Icons.ErrorIcon />}
	/>
)
