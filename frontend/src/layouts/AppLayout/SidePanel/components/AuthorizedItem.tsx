import type { ReactNode } from 'react'

import { useAuthData } from '@/hooks'

interface AuthorizedItemProps {
	children: ReactNode
	fallback?: ReactNode
}

export const AuthorizedItem = ({
	children,
	fallback = null
}: AuthorizedItemProps) => {
	const { me } = useAuthData()

	return me ? children : fallback
}
