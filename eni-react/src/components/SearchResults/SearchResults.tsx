import type { FC } from 'react'
import { Link } from 'react-router-dom'

import { useAppDispatch } from '@/app/hooks'
import { addMovieToHistory } from '@/store'
import type { BaseKinoposikMovie } from '@/types'

import styles from './SearchResults.module.scss'

interface SearchResultsProps {
	movies: BaseKinoposikMovie[]
	title: string
}

export const SearchResults: FC<SearchResultsProps> = ({ movies, title }) => {
	const dispatch = useAppDispatch()

	const addToSearchHistory = (movie: BaseKinoposikMovie) => {
		dispatch(
			addMovieToHistory({
				year: movie.year,
				posterUrlPreview: movie.posterUrlPreview,
				filmId: movie.filmId,
				nameEn: movie.nameEn,
				nameRu: movie.nameRu
			})
		)
	}

	return (
		<div className={styles.resultsContainer}>
			<h2 className={styles.header}>{title}</h2>
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
		</div>
	)
}
