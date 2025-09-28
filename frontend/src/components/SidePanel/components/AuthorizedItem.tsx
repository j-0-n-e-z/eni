import type { ReactNode } from 'react'

import { useSidePanelContext } from '@/hooks'

interface AuthorizedItemProps {
	children: ReactNode
	fallback?: ReactNode
}

export const AuthorizedItem = ({
	children,
	fallback = null
}: AuthorizedItemProps) => {
	const { me } = useSidePanelContext()

	return me ? children : fallback
}
