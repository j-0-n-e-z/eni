import type { FC } from 'react'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { useAppSelector } from '@/app/hooks'
import { EmptyState, SearchResults } from '@/components'
import { useDebounce } from '@/hooks'
import { CancelIcon, MovieIcon, SearchIcon } from '@/icons'
import { selectMoviesFromHistory } from '@/store'
import { useLazySearchMoviesQuery } from '@/store/api'

import styles from './Search.module.scss'

export const Search: FC = () => {
	const [searchParams] = useSearchParams()
	const [movieTitle, setMovieTitle] = useState(searchParams.get('query') ?? '')
	const [debouncedMovieTitle, cancelDebounce] = useDebounce(movieTitle, 500)
	const inputRef = useRef<HTMLInputElement>(null)
	const historyMovies = useAppSelector(selectMoviesFromHistory)
	const [triggerSearch, { data: movies, isLoading, error, reset }] =
		useLazySearchMoviesQuery()
	const navigate = useNavigate()

	useEffect(() => {
		if (debouncedMovieTitle) {
			navigate(`/search?query=${debouncedMovieTitle}`)
		} else {
			navigate('/search')
		}
	}, [debouncedMovieTitle])

	useEffect(() => {
		const query = searchParams.get('query') ?? ''

		if (!query) {
			setMovieTitle('')
			reset()
			return
		}

		triggerSearch(query)
	}, [searchParams])

	function clearInput() {
		cancelDebounce()
		reset()
		setMovieTitle('')
		navigate('/search')
		inputRef.current?.focus()
	}

	function searchMovies() {
		const movieTitleTrimmed = movieTitle.trim()

		if (movieTitleTrimmed) {
			cancelDebounce()
			triggerSearch(movieTitleTrimmed)
		}
	}

	function onSearchInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === 'Enter') {
			searchMovies()
		}
	}

	function renderSearchResults() {
		if (isLoading) return <div>Загрузка...</div>

		if (error) return <div>JSON.stringify(error)</div>

		if (!movies && !historyMovies.length)
			return (
				<EmptyState
					description='Введите название фильма в поле поиска'
					header='Пока пусто'
					icon={<MovieIcon />}
				/>
			)

		if (movies && !movies.length)
			return (
				<EmptyState
					description='Похоже фильм отсутствует в базе кинопоиска'
					header='Ничего не найдено'
					icon={<MovieIcon />}
				/>
			)

		if (movies && movies.length) {
			const moviesSortedByVotesCount = [...movies].sort(
				(a, b) => b.ratingVoteCount - a.ratingVoteCount
			)
			return <SearchResults movies={moviesSortedByVotesCount} />
		}

		if (historyMovies.length)
			return <SearchResults isHistory movies={historyMovies} />

		return null
	}

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

			<div className={styles.searchResultsContainer}>
				{renderSearchResults()}
			</div>
		</div>
	)
}
