import cn from 'classnames'
import { useSearchParams } from 'react-router-dom'

import { Background, Container } from '@/ui'
import { notifyOnSuccess } from '@/utils'

import { Hero } from './components/Hero/Hero'

import s from './Main.module.scss'

export const Main = () => {
	const [params] = useSearchParams()
	const isEmailConfirmed = params.get('email_confirmed') === '1'

	if (isEmailConfirmed) {
		notifyOnSuccess('Вы успешно подтвердили почту!', 'emailConfirmed')
	}

	return (
		<Container className={s.main}>
			<Hero />
			<Background.Circle className={s.bgCircle} />
			<div className={cn(s.particle, s.particle1)} />
			<div className={cn(s.particle, s.particle2)} />
			<div className={cn(s.particle, s.particle3)} />
		</Container>
	)
}
