import { useGetMeQuery } from '@/api'

export const useAuth = () => {
	const accessToken = localStorage.getItem('accessToken')
	const {
		data: me,
		isLoading,
		isError
	} = useGetMeQuery(undefined, { skip: !accessToken })
	const isAuthenticated = Boolean(me) && !isError

	return { me, isLoading, isAuthenticated, isError }
}
