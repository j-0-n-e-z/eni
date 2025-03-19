import React, { useEffect, useState } from 'react'
import './App.scss'
import { SearchResult } from './components/SearchResult'
import { fetchMovies } from './fetchMovies'
import useDebounce from './hooks/useDebounce'
import { Movie, Subtitle } from './types'

function App() {
	const [movieTitle, setMovieTitle] = useState('')
	const [movies, setMovies] = useState<Movie[] | null>(null)
	const [subtitles, setSubtitles] = useState<Subtitle[] | null>(null)
	const [isRequestPending, setIsRequestPending] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const [debouncedMovieTitle, cancelDebounce] = useDebounce(movieTitle, 1000)

	async function searchSubtitles(query: string) {
		if (isRequestPending) return

		setIsRequestPending(true)

		try {
			const movies = await fetchMovies(query)

			if (movies) {
				console.log(movies)
				setMovies(movies)
				setError(null)
			}
		} catch (e) {
			setError((e as Error).message)
		} finally {
			setIsRequestPending(false)
		}
	}

	function onSearchInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		if (movieTitle && e.key === 'Enter') {
			cancelDebounce()
			searchSubtitles(movieTitle)
		}
	}

	useEffect(() => {
		if (!debouncedMovieTitle) {
			setMovies(null)
			return
		}
		if (debouncedMovieTitle && !isRequestPending) {
			searchSubtitles(debouncedMovieTitle)
		}
	}, [debouncedMovieTitle])

	return (
		<div className='main'>
			<div className='search'>
				<input
					className='search-input'
					id='search-input'
					type='search'
					value={movieTitle}
					onChange={(e) => setMovieTitle(e.target.value)}
					onKeyDown={onSearchInputKeyDown}
					placeholder='Enter Movie Title...'
				/>
				{error && <div className='search-error'>{error}</div>}
				{movies ? (
					movies.length === 0 ? (
						<div className='nothing-found'>Nothing found</div>
					) : (
						<ul className='search-results'>
							{movies.map((movie) => (
								<SearchResult
									key={movie.id}
									movie={movie}
									setSubtitles={setSubtitles}
								/>
							))}
						</ul>
					)
				) : null}
			</div>
			{subtitles && subtitles.length !== 0 && (
				<ul>
					{subtitles.map((subtitle) => (
						<li key={subtitle.index}>{subtitle.text}</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default App
