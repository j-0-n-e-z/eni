import { useEffect, useRef, useState } from 'react'
import 'react-loading-skeleton/dist/skeleton.css'
import { useSelector } from 'react-redux'

import { useDebounce } from '@/hooks'
import { selectMoviesFromHistory } from '@/store'
import { useLazySearchMoviesQuery } from '@/store/api'
import { Container, EmptyState, ErrorDisplay, Icons } from '@/ui'

import styles from './Search.module.scss'
import { SearchResults } from './components/SearchResults'
import { SearchResultsSkeleton } from './components/SearchResults/SearchResultsSkeleton'

export const Search = () => {
	const [movieTitle, setMovieTitle] = useState('')
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
			searchQueryRef.current = triggerSearch(debouncedMovieTitle)
		}
	}, [debouncedMovieTitle])

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
					icon={<Icons.MovieIcon />}
				/>
			)

		if (movies && !movies.length)
			return (
				<EmptyState
					description='Похоже фильм отсутствует в базе кинопоиска'
					header='Ничего не найдено'
					icon={<Icons.MovieIcon />}
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
		<Container className={styles.searchPage}>
			<div className={styles.searchContainer}>
				<label className={styles.inputContainer} htmlFor='search'>
					<button className={styles.searchBtn} onClick={searchMovies}>
						<Icons.SearchIcon className={styles.searchIcon} />
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
						<Icons.CancelIcon className={styles.clearIcon} />
					</button>
				</label>
			</div>

			<div className={styles.searchResultsContainer}>
				{renderSearchResults()}
			</div>
		</Container>
	)
}
