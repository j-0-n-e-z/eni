import cn from 'classnames'
import { useInView } from 'react-intersection-observer'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { removeMovieFromHistory, upsertMovieInHistory } from '@/store'
import type { BaseKinoposikMovie } from '@/types'
import { DeleteButton } from '@/ui'
import { formatDurationStrToHours } from '@/utils'

import styles from './MovieCard.module.scss'

interface MovieCardProps {
	movie: BaseKinoposikMovie
	isHistory?: true
}

export const MovieCard = ({ movie, isHistory }: MovieCardProps) => {
	const { ref, inView } = useInView({
		threshold: 0.2,
		triggerOnce: true
	})
	const dispatch = useDispatch()

	const onDeleteButtonClick = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault()
		e.stopPropagation()
		dispatch(removeMovieFromHistory(movie.filmId))
	}

	return (
		<li
			key={movie.filmId}
			ref={ref}
			className={cn(styles.searchResultItem, { [styles.inView]: inView })}
		>
			<Link
				className={styles.movieCard}
				to={`/movie/${movie.filmId}`}
				onClick={() => dispatch(upsertMovieInHistory(movie))}
			>
				{isHistory && (
					<DeleteButton
						className={styles.deleteBtn}
						onClick={onDeleteButtonClick}
					/>
				)}
				<img
					alt={`${movie.nameEn || movie.nameRu} Cover`}
					className={styles.cover}
					src={movie.posterUrlPreview}
				/>
				<div className={styles.details}>
					<div className={styles.detailsRow}>
						<h3 className={styles.title}>{movie.nameEn || movie.nameRu}</h3>
						{movie.rating && (
							<div className={styles.rating}>{movie.rating}</div>
						)}
					</div>
					<div className={styles.detailsRow}>
						<span className={styles.year}>{movie.year}</span>
						{movie.filmLength && (
							<span className={styles.duration}>
								{formatDurationStrToHours(movie.filmLength)}
							</span>
						)}
					</div>
				</div>
			</Link>
		</li>
	)
}
