import type { FC } from 'react'
import React, { useEffect, useRef, useState } from 'react'

import { useLazySearchMoviesQuery } from '@/api'
import { SearchResults } from '@/components'
import { useDebounce } from '@/hooks'

import ClearIcon from '../../assets/icons/icon-cancel.svg?react'
import SearchIcon from '../../assets/icons/icon-search.svg?react'

import styles from './Search.module.scss'

export const Search: FC = () => {
	const [movieTitle, setMovieTitle] = useState('')
	const [debouncedMovieTitle, cancelDebounce] = useDebounce(movieTitle, 1000)
	const inputRef = useRef<HTMLInputElement>(null)

	const [triggerSearch, { data: movies, isFetching, error, isUninitialized }] =
		useLazySearchMoviesQuery()

	function clearInput() {
		cancelDebounce()
		setMovieTitle('')
		inputRef.current?.focus()
	}

	function searchMovies() {
		if (movieTitle) {
			cancelDebounce()
			triggerSearch(movieTitle)
		}
	}

	function onSearchInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === 'Enter') {
			searchMovies()
		}
	}

	useEffect(() => {
		if (debouncedMovieTitle && !isFetching) {
			triggerSearch(debouncedMovieTitle)
		}
	}, [debouncedMovieTitle])

	return (
		<>
			<div className={styles.searchContainer}>
				<label className={styles.inputContainer} htmlFor='search'>
					<button className={styles.searchBtn} onClick={searchMovies}>
						<SearchIcon className={styles.searchIcon} />
					</button>

					<input
						ref={inputRef}
						className={styles.searchInput}
						id='search'
						placeholder='Enter movie title'
						type='search'
						value={movieTitle}
						onChange={(e) => setMovieTitle(e.target.value)}
						onKeyDown={onSearchInputKeyDown}
					/>

					<button className={styles.clearBtn} onClick={clearInput}>
						<ClearIcon className={styles.clearIcon} />
					</button>
				</label>
			</div>
			<div className={styles.results}>
				{isFetching && <div>Загрузка...</div>}
				{isUninitialized && !movies && <div>Пока пусто</div>}
				{error && (
					<div className={styles.searchError}>
						{'data' in error
							? (error.data as { message: string }).message
							: 'Ошибка поиска'}
					</div>
				)}
				{movies && movies.length === 0 && <div>Ничего не найдено</div>}
				{movies && movies.length !== 0 && (
					<div className={styles.resultsContainer}>
						<h2 className={styles.header}>Результаты поиска</h2>
						<SearchResults movies={movies} />
					</div>
				)}
			</div>
		</>
	)
}
