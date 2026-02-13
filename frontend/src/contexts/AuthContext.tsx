import type { ReactNode } from 'react'
import { createContext } from 'react'

import { useAuth } from '@/hooks'

type AuthProps = ReturnType<typeof useAuth>

export const AuthDataContext = createContext<AuthProps['data'] | null>(null)
export const AuthActionsContext = createContext<AuthProps['actions'] | null>(
	null
)

interface AuthDataProviderProps {
	children: ReactNode
}

export const AuthProvider = ({ children }: AuthDataProviderProps) => {
	const { actions, data } = useAuth()

	return (
		<AuthDataContext.Provider value={data}>
			<AuthActionsContext.Provider value={actions}>
				{children}
			</AuthActionsContext.Provider>
		</AuthDataContext.Provider>
	)
}
