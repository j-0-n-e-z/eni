import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useSearchParams } from 'react-router-dom'

export const Main = () => {
	const [params] = useSearchParams()
	const isVerifined = params.get('email_confirmed') === '1'

	useEffect(() => {
		if (isVerifined) {
			toast.success('You successfully verified your email!')
		}
	}, [isVerifined])

	return <div>Main</div>
}
