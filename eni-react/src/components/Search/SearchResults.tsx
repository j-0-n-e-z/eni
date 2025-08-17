import type { FC } from 'react'
import { Link } from 'react-router-dom'

import { useAppDispatch } from '@/app/hooks'
import { addMovieToHistory } from '@/store'
import type { BaseKinoposikMovie } from '@/types'

import styles from './Search.module.scss'

interface SearchResultsProps {
	movies: BaseKinoposikMovie[]
	isHistory?: true
}

export const SearchResults: FC<SearchResultsProps> = ({
	movies,
	isHistory
}) => {
	const dispatch = useAppDispatch()

	const addToSearchHistory = (movie: BaseKinoposikMovie) => {
		if (isHistory) return

		dispatch(
			addMovieToHistory({
				year: movie.year,
				posterUrlPreview: movie.posterUrlPreview,
				filmId: movie.filmId,
				nameEn: movie.nameEn,
				nameRu: movie.nameRu,
				type: movie.type
			})
		)
	}

	return (
		<>
			<h2 className={styles.header}>
				{isHistory ? 'История поиска' : 'Результаты поиска'}
			</h2>
			<ul className={styles.searchResults}>
				{movies.map(({ filmId, posterUrlPreview, nameEn, year }, i, movies) => (
					<li key={filmId}>
						<Link
							className={styles.movieCard}
							to={`/movie/${filmId}`}
							onClick={() => addToSearchHistory(movies[i])}
						>
							<img
								alt={`${nameEn} Cover`}
								className={styles.cover}
								src={posterUrlPreview}
							/>
							<div className={styles.details}>
								<h3 className={styles.title}>{nameEn}</h3>
								<span className={styles.year}>{year}</span>
							</div>
						</Link>
					</li>
				))}
			</ul>
		</>
	)
}
