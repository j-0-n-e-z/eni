import type { FC } from 'react'
import { useEffect, useRef, useState } from 'react'
import 'react-loading-skeleton/dist/skeleton.css'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

import { EmptyState, ErrorDisplay, SearchResults } from '@/components'
import { useDebounce } from '@/hooks'
import { CancelIcon, MovieIcon, SearchIcon } from '@/icons'
import { selectMoviesFromHistory } from '@/store'
import { useLazySearchMoviesQuery } from '@/store/api'

import styles from './Search.module.scss'
import { SearchResultsSkeleton } from './SearchResultsSkeleton'

export const SearchPage: FC = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const [movieTitle, setMovieTitle] = useState(searchParams.get('query') ?? '')
	const [debouncedMovieTitle, cancelDebounce] = useDebounce(movieTitle, 500)
	const historyMovies = useSelector(selectMoviesFromHistory)
	const [
		triggerSearch,
		{
			data: movies,
			isFetching: isSearchFetching,
			error: searchError,
			reset: searchReset
		}
	] = useLazySearchMoviesQuery()
	const inputRef = useRef<HTMLInputElement>(null)
	const searchQueryRef = useRef<ReturnType<typeof triggerSearch> | null>(null)

	useEffect(() => {
		if (debouncedMovieTitle) {
			if (searchParams.get('query') !== debouncedMovieTitle) {
				setSearchParams({ query: debouncedMovieTitle })
			}
			searchQueryRef.current = triggerSearch(debouncedMovieTitle)
		} else {
			setSearchParams({})
		}
	}, [debouncedMovieTitle])

	useEffect(() => {
		const query = searchParams.get('query')

		if (!query) {
			searchQueryRef.current?.abort()
			searchQueryRef.current = null
			return
		}

		if (movieTitle.trim() !== query) {
			setMovieTitle(query)
		}
	}, [searchParams])

	useEffect(() => () => searchQueryRef.current?.abort(), [])

	function clearInput() {
		searchQueryRef.current?.abort()
		searchQueryRef.current = null
		cancelDebounce()
		searchReset()
		setMovieTitle('')
		inputRef.current?.focus()
	}

	function searchMovies() {
		const movieTitleTrimmed = movieTitle.trim()

		if (movieTitleTrimmed) {
			cancelDebounce()
			setSearchParams({ query: movieTitleTrimmed })
			searchQueryRef.current = triggerSearch(movieTitleTrimmed)
		}
	}

	function renderSearchResults() {
		if (isSearchFetching) return <SearchResultsSkeleton />

		if (searchError) return <ErrorDisplay error={searchError} />

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
						onKeyDown={(e) => e.key === 'Enter' && searchMovies()}
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
