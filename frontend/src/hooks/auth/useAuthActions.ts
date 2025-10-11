import { useContext } from 'react'

import { AuthActionsContext } from '@/contexts'

export const useAuthActions = () => {
	const context = useContext(AuthActionsContext)

	if (!context)
		throw Error('useAuthActions must be used within AuthActionsProvider')

	return context
}
