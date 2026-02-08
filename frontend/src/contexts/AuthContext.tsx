import type { ReactNode } from 'react'
import { createContext } from 'react'

import { useAuth } from '@/hooks'

type AuthProps = ReturnType<typeof useAuth>

type AuthDataContextType = Omit<AuthProps, 'login' | 'logout'>

type AuthActionsContextType = Pick<AuthProps, 'login' | 'logout'>

export const AuthDataContext = createContext<AuthDataContextType | null>(null)

export const AuthActionsContext = createContext<AuthActionsContextType | null>(
	null
)

interface AuthDataProviderProps {
	children: ReactNode
}

export const AuthProvider = ({ children }: AuthDataProviderProps) => {
	const { login, logout, ...data } = useAuth()

	return (
		<AuthDataContext.Provider value={data}>
			<AuthActionsContext.Provider value={{ login, logout }}>
				{children}
			</AuthActionsContext.Provider>
		</AuthDataContext.Provider>
	)
}
