import { useContext } from 'react'

import { AuthDataContext } from '@/contexts/AuthContext'

export const useAuthData = () => {
	const context = useContext(AuthDataContext)

	if (!context) throw Error('useAuthData must be used within AuthDataProvider')

	return context
}
