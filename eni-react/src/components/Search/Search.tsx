import type { FC } from 'react'
import React, { useEffect, useRef, useState } from 'react'

import { useLazySearchMoviesQuery } from '@/api'
import { useAppSelector } from '@/app/hooks'
import { SearchResults } from '@/components'
import { useDebounce } from '@/hooks'
import { CancelIcon, SearchIcon } from '@/icons'
import { selectMoviesFromHistory } from '@/store'

import styles from './Search.module.scss'

export const Search: FC = () => {
	const [movieTitle, setMovieTitle] = useState('')
	const [debouncedMovieTitle, cancelDebounce] = useDebounce(movieTitle, 1000)
	const inputRef = useRef<HTMLInputElement>(null)
	const searchedMovies = useAppSelector(selectMoviesFromHistory)

	const [triggerSearch, { data: movies, isFetching, error }] =
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
						<CancelIcon className={styles.clearIcon} />
					</button>
				</label>
			</div>
			<div className={styles.results}>
				{isFetching && <div>Загрузка...</div>}
				{!isFetching && !movies && searchedMovies.length === 0 && (
					<div>Пока пусто</div>
				)}
				{error && (
					<div className={styles.searchError}>
						{'data' in error
							? (error.data as { message: string }).message
							: 'Ошибка поиска'}
					</div>
				)}
				{!isFetching && movies && movies.length === 0 && (
					<div>Ничего не найдено</div>
				)}
				{}
				{!isFetching && movies && movies.length !== 0 && (
					<SearchResults movies={movies} title='Результаты поиска' />
				)}
				{!isFetching && !movies && searchedMovies.length !== 0 && (
					<SearchResults movies={searchedMovies} title='Вы искали' />
				)}
			</div>
		</>
	)
}
