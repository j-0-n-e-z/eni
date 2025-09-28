import { useGetMeQuery, useLogoutMutation } from '@/store/api'

export const useAuth = () => {
	const { data: me, isFetching: isMeFetching, error: meError } = useGetMeQuery()
	const [logout, { isLoading: isLogoutLoading, error: logoutError }] =
		useLogoutMutation()

	return { isLogoutLoading, isMeFetching, logout, logoutError, me, meError }
}
