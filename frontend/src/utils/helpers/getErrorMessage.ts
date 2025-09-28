import type { SerializedError } from '@reduxjs/toolkit'

import type { BackendError } from '@/store/api'

export function getErrorMessage(
	error: BackendError | SerializedError | undefined
) {
	if (!error) return ''

	if ('data' in error && error.data?.error) {
		return error.data.error.message
	}

	if ('name' in error) {
		return error.message ?? 'Unknown error'
	}

	return 'Error occured'
}
