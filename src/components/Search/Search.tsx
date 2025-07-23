/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import type { FC } from 'react'
import React, { useEffect, useRef, useState } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/index'
import { SearchResults } from '@/components'
import { useDebounce } from '@/hooks'
import { selectMovies } from '@/slices'
import { fetchMovies } from '@/thunks'

import styles from './Search.module.scss'

export const Search: FC = () => {
	const [movieTitle, setMovieTitle] = useState('')
	const { movies, status, error } = useAppSelector(selectMovies)
	const dispatch = useAppDispatch()
	const [debouncedMovieTitle, cancelDebounce] = useDebounce(movieTitle, 1000)
	const inputRef = useRef<HTMLInputElement>(null)

	function onSearchInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		if (movieTitle && e.key === 'Enter') {
			cancelDebounce()
			dispatch(fetchMovies(movieTitle))
		}
	}

	function clearInput() {
		cancelDebounce()
		setMovieTitle('')
		inputRef.current?.focus()
	}

	function searchMovies() {
		if (movieTitle) {
			cancelDebounce()
			dispatch(fetchMovies(movieTitle))
		}
	}

	useEffect(() => {
		if (debouncedMovieTitle && status !== 'pending') {
			dispatch(fetchMovies(debouncedMovieTitle))
		}
	}, [debouncedMovieTitle])

	return (
		<>
			<div className={styles.searchContainer}>
				<label className={styles.searchInputContainer}>
					<button className={styles.serchButton} onClick={searchMovies}>
						<img
							alt='0'
							className={styles.searchIcon}
							src='/assets/icons/icon-search.svg'
						/>
					</button>

					<input
						ref={inputRef}
						className={styles.searchInput}
						placeholder='Enter movie title'
						type='search'
						value={movieTitle}
						onChange={(e) => setMovieTitle(e.target.value)}
						onKeyDown={onSearchInputKeyDown}
					/>

					<button className={styles.inputClearButton} onClick={clearInput}>
						<img
							alt='x'
							className={styles.clearIcon}
							src='/assets/icons/icon-cancel.svg'
						/>
					</button>
				</label>
			</div>
			<div className={styles.content}>
				{status === 'pending' && <div>Загрузка...</div>}
				{status === 'idle' && !movies && <div>Пока пусто</div>}
				{status === 'idle' && error && (
					<div className={styles.searchError}>{error}</div>
				)}
				{status === 'idle' && movies && movies.length === 0 && (
					<div>Ничего не найдено</div>
				)}
				{status === 'idle' && movies && movies.length !== 0 && (
					<div className={styles.searchResultsContainer}>
						<h2 className={styles.header}>Результаты поиска</h2>
						<SearchResults movies={movies} />
					</div>
				)}
			</div>
		</>
	)
}
