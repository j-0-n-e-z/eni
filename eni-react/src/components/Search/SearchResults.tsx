import type { FC } from 'react'
import React from 'react'

import { useAppDispatch } from '@/app/hooks'
import {
	clearMovieHistory,
	removeMovieFromHistory,
	upsertMovieInHistory
} from '@/store'
import type { BaseKinoposikMovie } from '@/types'

import { DeleteButton } from './DeleteButton'
import { MovieCard } from './MovieCard'
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
		dispatch(
			upsertMovieInHistory({
				filmId: movie.filmId,
				filmLength: movie.filmLength,
				nameEn: movie.nameEn,
				nameRu: movie.nameRu,
				posterUrlPreview: movie.posterUrlPreview,
				rating: movie.rating,
				type: movie.type,
				year: movie.year
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
					<MovieCard
						key={movie.filmId}
						addToSearchHistory={addToSearchHistory}
						handleDeleteMovieBtnClick={handleDeleteMovieBtnClick}
						isHistory={isHistory}
						movie={movie}
					/>
				))}
			</ul>
		</>
	)
}
