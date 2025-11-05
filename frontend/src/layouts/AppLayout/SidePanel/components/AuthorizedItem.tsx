import { useAuthData } from '@/hooks'

interface AuthorizedItemProps {
	children: React.ReactNode
	fallback?: React.ReactNode
}

export const AuthorizedItem = ({
	children,
	fallback = null
}: AuthorizedItemProps) => {
	const { me } = useAuthData()

	return me ? children : fallback
}
