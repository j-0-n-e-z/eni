import React, { useEffect, useState } from 'react'
import './App.scss'
import { SearchResult } from './components/SearchResult'
import { fetchSubtitles } from './fetchSubtitles'
import useDebounce from './hooks/useDebounce'
import { Subtitle } from './types'

function App() {
	const [movieTitle, setMovieTitle] = useState('')
	const [subtitles, setSubtitles] = useState<Subtitle[] | null>(null)
	const [isRequestPending, setIsRequestPending] = useState(false)
	const [error, setError] = useState('')

	const [debouncedMovieTitle, cancelDebounce] = useDebounce(movieTitle, 1000)

	async function searchSubtitles(query: string) {
		if (isRequestPending) return

		setIsRequestPending(true)

		try {
			const subtitles = await fetchSubtitles(query)

			if (subtitles) {
				console.log(subtitles)
				setSubtitles(subtitles)
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
			setSubtitles(null)
			return
		}
		if (debouncedMovieTitle && !isRequestPending) {
			searchSubtitles(debouncedMovieTitle)
		}
	}, [debouncedMovieTitle])

	return (
		<div className='main'>
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
			{subtitles ? (
				subtitles.length === 0 ? (
					<div className='nothing-found'>Nothing found</div>
				) : (
					<ul className='search-results'>
						{subtitles.map((subtitle) => (
							<SearchResult key={subtitle.id} subtitle={subtitle} />
						))}
					</ul>
				)
			) : null}
		</div>
	)
}

export default App
