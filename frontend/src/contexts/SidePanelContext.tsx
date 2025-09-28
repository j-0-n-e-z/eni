import type { ReactNode } from 'react'
import { createContext, useMemo } from 'react'
import { useLocation } from 'react-router-dom'

import { useAuth } from '@/hooks'
import type { User } from '@/types'

export interface SidePanelContextType {
	location: ReturnType<typeof useLocation>
	me: User | undefined
	isMeFetching: boolean
}

export const SidePanelContext = createContext<SidePanelContextType | null>(null)

export interface SidePanelContextProviderProps {
	children: ReactNode
}

export const SidePanelContextProvider = ({
	children
}: SidePanelContextProviderProps) => {
	const { me, isMeFetching } = useAuth()
	const location = useLocation()

	const contextValue = useMemo(
		() => ({
			isMeFetching,
			location,
			me
		}),
		[location.pathname, isMeFetching, me?.id]
	)

	return (
		<SidePanelContext.Provider value={contextValue}>
			{children}
		</SidePanelContext.Provider>
	)
}
