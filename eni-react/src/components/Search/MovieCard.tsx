import cn from 'classnames'
import type { FC } from 'react'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'

import type { BaseKinoposikMovie } from '@/types'

import { DeleteButton } from './DeleteButton'
import styles from './Search.module.scss'

interface MovieCardProps {
	movie: BaseKinoposikMovie
	isHistory?: true
	addToSearchHistory: (movie: BaseKinoposikMovie) => void
	handleDeleteMovieBtnClick: (
		e: React.MouseEvent<HTMLButtonElement>,
		filmId: number
	) => void
}

export const MovieCard: FC<MovieCardProps> = ({
	movie,
	addToSearchHistory,
	handleDeleteMovieBtnClick,
	isHistory
}) => {
	const { ref, inView } = useInView({
		threshold: 0.3,
		triggerOnce: true
	})

	return (
		<li
			key={movie.filmId}
			ref={ref}
			className={cn(styles.searchResultItem, { [styles.inView]: inView })}
		>
			<Link
				className={styles.movieCard}
				to={`/movie/${movie.filmId}`}
				onClick={() => addToSearchHistory(movie)}
			>
				{isHistory && (
					<div className={styles.deleteBtnWrapper}>
						<DeleteButton
							onClick={(e) => handleDeleteMovieBtnClick(e, movie.filmId)}
						/>
					</div>
				)}
				<img
					alt={`${movie.nameEn || movie.nameRu} Cover`}
					className={styles.cover}
					src={movie.posterUrlPreview}
				/>
				<div className={styles.details}>
					<h3 className={styles.title}>{movie.nameEn || movie.nameRu}</h3>
					<span className={styles.year}>{movie.year}</span>
				</div>
			</Link>
		</li>
	)
}
