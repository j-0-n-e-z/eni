import type { FC } from 'react'
import React from 'react'
import { Link } from 'react-router-dom'

import { useAppDispatch } from '@/app/hooks'
import {
	addMovieToHistory,
	clearMovieHistory,
	removeMovieFromHistory
} from '@/store'
import type { BaseKinoposikMovie } from '@/types'

import { DeleteButton } from './DeleteButton'
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

	const handleDeleteMovieBtnClick = (
		e: React.MouseEvent<HTMLButtonElement>,
		filmId: number
	) => {
		e.preventDefault()
		e.stopPropagation()
		dispatch(removeMovieFromHistory(filmId))
	}

	return (
		<>
			<h2 className={styles.header}>
				{isHistory ? 'История поиска' : 'Результаты поиска'}
				{isHistory && (
					<DeleteButton onClick={() => dispatch(clearMovieHistory())} />
				)}
			</h2>
			<ul className={styles.searchResultList}>
				{movies.map((movie) => (
					<li key={movie.filmId} className={styles.searchResultItem}>
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
								alt={`${movie.nameEn} Cover`}
								className={styles.cover}
								src={movie.posterUrlPreview}
							/>
							<div className={styles.details}>
								<h3 className={styles.title}>{movie.nameEn}</h3>
								<span className={styles.year}>{movie.year}</span>
							</div>
						</Link>
					</li>
				))}
			</ul>
		</>
	)
}
