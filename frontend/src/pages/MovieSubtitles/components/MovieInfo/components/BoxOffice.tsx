import cn from 'classnames'

import { useGetMovieBoxOfficeByKinopoiskIdQuery } from '@/store/api'
import type { KinopoiskMovie } from '@/types'
import { Skeleton } from '@/ui'
import { formatMoney, notifyOnError } from '@/utils'

import styles from '../MovieInfo.module.scss'

interface BoxOfficeProps {
	movie: KinopoiskMovie
}

export const BoxOffice = ({ movie }: BoxOfficeProps) => {
	const {
		data: boxOffice,
		error: boxOfficeError,
		isFetching: isBoxOfficeFetching
	} = useGetMovieBoxOfficeByKinopoiskIdQuery(movie.kinopoiskId, {
		skip: !movie.kinopoiskId
	})

	if (isBoxOfficeFetching)
		return (
			<>
				<Skeleton width='10rem' />
				<Skeleton width='10rem' />
			</>
		)

	if (boxOfficeError) {
		notifyOnError('Faild to load budget and box office', 'boxOfficeError')
		return null
	}

	const budget = boxOffice?.items.find((item) => item.type === 'BUDGET')
	const boxOfficeWorld = boxOffice?.items.find((item) => item.type === 'WORLD')

	return (
		<>
			{budget && (
				<div className={styles.metaItem}>
					<span className={styles.metaLabel}>Бюджет:</span>
					<span className={cn(styles.metaValue, styles.budget)}>
						{formatMoney(
							budget.amount,
							budget.currencyCode || budget.symbol || 'USD'
						)}
					</span>
				</div>
			)}

			{boxOfficeWorld && (
				<div className={styles.metaItem}>
					<span className={styles.metaLabel}>Сборы:</span>
					<span className={cn(styles.metaValue, styles.boxOffice)}>
						{formatMoney(
							boxOfficeWorld.amount,
							boxOfficeWorld.currencyCode || 'USD'
						)}
					</span>
				</div>
			)}
		</>
	)
}
