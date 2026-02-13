import { useGetMeQuery, useLoginMutation, useLogoutMutation } from '@/store/api'

export const useAuth = () => {
	const {
		data: me,
		isFetching: isMeFetching,
		error: meError,
		isSuccess: isMeSuccess
	} = useGetMeQuery()
	const [logout, { isLoading: isLogoutLoading, error: logoutError }] =
		useLogoutMutation()
	const [login, { isLoading: isLoginLoading, error: loginError }] =
		useLoginMutation()

	return {
		actions: {
			login,
			logout
		},
		data: {
			isLoginLoading,
			isLogoutLoading,
			isMeFetching,
			isMeSuccess,
			loginError,
			logoutError,
			me,
			meError
		}
	}
}
