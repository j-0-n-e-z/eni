import type { FC } from 'react'
import React, { useEffect, useRef, useState } from 'react'

import { useLazySearchMoviesQuery } from '@/api'
import { useAppSelector } from '@/app/hooks'
import { EmptyState, SearchResults } from '@/components'
import { useDebounce } from '@/hooks'
import { CancelIcon, MovieIcon, SearchIcon } from '@/icons'
import { selectMoviesFromHistory } from '@/store'

import styles from './Search.module.scss'

export const Search: FC = () => {
	const [movieTitle, setMovieTitle] = useState('')
	const [debouncedMovieTitle, cancelDebounce] = useDebounce(movieTitle, 500)
	const inputRef = useRef<HTMLInputElement>(null)
	const searchedMovies = useAppSelector(selectMoviesFromHistory)
	const [triggerSearch, { data: movies, isFetching, error, reset }] =
		useLazySearchMoviesQuery()

	function render() {
		if (isFetching) return <div>Загрузка...</div>
		if (error) return <div>JSON.stringify(error)</div>
		if (!movies && !searchedMovies.length)
			return (
				<EmptyState
					description='Введите название фильма в поле поиска'
					header='Пока пусто'
					icon={<MovieIcon />}
				/>
			)
		if (movies && movies.length)
			return (
				<EmptyState
					description='Похоже фильм отсутствует в базе кинопоиска'
					header='Ничего не найдено'
					icon={<MovieIcon />}
				/>
			)
		if (movies && movies.length) return <SearchResults movies={movies} />
		if (searchedMovies.length)
			return <SearchResults isHistory movies={searchedMovies} />
		return null
	}

	function clearInput() {
		cancelDebounce()
		setMovieTitle('')
		reset()
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
		if (!debouncedMovieTitle) {
			reset()
			return
		}

		if (!isFetching) {
			triggerSearch(debouncedMovieTitle)
		}
	}, [debouncedMovieTitle])

	return (
		<div className={styles.searchPage}>
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

			<div className={styles.searchResultsContainer}>{render()}</div>
		</div>
	)
}
