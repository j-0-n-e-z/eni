import type { ReactNode } from 'react'
import { createContext, useMemo } from 'react'

import { useAuth } from '@/hooks'

type AuthDataContextType = Pick<
	ReturnType<typeof useAuth>,
	| 'me'
	| 'meError'
	| 'isMeSuccess'
	| 'isMeFetching'
	| 'isLoginLoading'
	| 'isLogoutLoading'
	| 'loginError'
	| 'logoutError'
>

type AuthActionsContextType = Pick<
	ReturnType<typeof useAuth>,
	'login' | 'logout'
>

export const AuthDataContext = createContext<AuthDataContextType | null>(null)

export const AuthActionsContext = createContext<AuthActionsContextType | null>(
	null
)

interface AuthDataProviderProps {
	children: ReactNode
}

export const AuthProvider = ({ children }: AuthDataProviderProps) => {
	const {
		me,
		isMeFetching,
		meError,
		login,
		loginError,
		logout,
		logoutError,
		isLoginLoading,
		isLogoutLoading,
		isMeSuccess
	} = useAuth()

	const dataValue = useMemo(
		() => ({
			isLoginLoading,
			isLogoutLoading,
			isMeFetching,
			isMeSuccess,
			loginError,
			logoutError,
			me,
			meError
		}),
		[isMeFetching, isLoginLoading, isLogoutLoading]
	)

	const actionsValue = useMemo(
		() => ({
			login,
			logout
		}),
		[login, logout]
	)

	return (
		<AuthDataContext.Provider value={dataValue}>
			<AuthActionsContext.Provider value={actionsValue}>
				{children}
			</AuthActionsContext.Provider>
		</AuthDataContext.Provider>
	)
}
