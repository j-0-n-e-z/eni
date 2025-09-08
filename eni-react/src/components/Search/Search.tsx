import type { FC } from 'react'
import { useEffect, useRef, useState } from 'react'
import 'react-loading-skeleton/dist/skeleton.css'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { useAppSelector } from '@/app/hooks'
import { EmptyState, SearchResults, ErrorDisplay } from '@/components'
import { useDebounce } from '@/hooks'
import { CancelIcon, MovieIcon, SearchIcon } from '@/icons'
import { selectMoviesFromHistory } from '@/store'
import { useLazySearchMoviesQuery } from '@/store/api'

import styles from './Search.module.scss'
import { SearchResultsSkeleton } from './SearchResultsSkeleton'

export const Search: FC = () => {
	const [searchParams] = useSearchParams()
	const [movieTitle, setMovieTitle] = useState(searchParams.get('query') ?? '')
	const [debouncedMovieTitle, cancelDebounce] = useDebounce(movieTitle, 500)
	const historyMovies = useAppSelector(selectMoviesFromHistory)
	const [
		triggerSearch,
		{
			data: movies,
			isFetching: isSearchFetching,
			error: searchError,
			reset: searchReset
		}
	] = useLazySearchMoviesQuery()
	const navigate = useNavigate()
	const inputRef = useRef<HTMLInputElement>(null)
	const searchQueryRef = useRef<ReturnType<typeof triggerSearch> | null>(null)

	useEffect(() => {
		if (debouncedMovieTitle) {
			navigate(`/search?query=${debouncedMovieTitle}`)
		} else {
			navigate('/search')
		}
	}, [debouncedMovieTitle])

	useEffect(() => {
		const query = searchParams.get('query')

		if (!query) {
			searchQueryRef.current?.abort()
			searchQueryRef.current = null
			searchReset()
			return
		}

		searchQueryRef.current = triggerSearch(query)
	}, [searchParams])

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
			console.log(movies)
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
