import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import useDebounce from '../../hooks/useDebounce'
import { clearMovies, selectMovies } from '../../store/slices/moviesSlice'
import { fetchMovies } from '../../store/thunks/moviesThunk'
import styles from './Search.module.scss'
import SearchResults from './SearchResults/SearchResults'

export const Search = () => {
	const [movieTitle, setMovieTitle] = useState('')
	const { movies, status, error } = useAppSelector(selectMovies)
	const dispatch = useAppDispatch()
	const [debouncedMovieTitle, cancelDebounce] = useDebounce(movieTitle, 1000)

	console.log('render search')

	function onSearchInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		if (movieTitle && e.key === 'Enter') {
			cancelDebounce()
			dispatch(fetchMovies(movieTitle))
		}
	}

	useEffect(() => {
		if (!debouncedMovieTitle) {
			dispatch(clearMovies())
			return
		}
		if (debouncedMovieTitle && status !== 'pending') {
			dispatch(fetchMovies(debouncedMovieTitle))
		}
	}, [debouncedMovieTitle])

	return (
		<>
			<div className={styles.searchContainer}>
				<input
					className={styles.searchInput}
					id='search-input'
					type='search'
					value={movieTitle}
					onChange={(e) => setMovieTitle(e.target.value)}
					onKeyDown={onSearchInputKeyDown}
					placeholder='Enter movie title'
				/>
			</div>
			{status === 'pending' && <div>Загрузка...</div>}
			{error && <div className={styles.searchError}>{error}</div>}
			{movies && movies.length === 0 && <div>Ничего не найдено</div>}
			{movies && movies.length !== 0 && (
				<div className={styles.searchResults}>
					<h2 className={styles.header}>
						Результаты поиска
					</h2>
					<SearchResults movies={movies} />
				</div>
			)}
		</>
	)
}
