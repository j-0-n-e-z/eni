import React, { useEffect, useState } from 'react'
import './App.scss'
import { SearchResult } from './components/SearchResult'
import { fetchSubtitles } from './fetchSubtitles'
import useDebounce from './hooks/useDebounce'
import { Subtitle } from './types'

function App() {
	const [movieTitle, setMovieTitle] = useState('')
	const [subtitles, setSubtitles] = useState<Subtitle[]>([])
	const [isRequestPending, setIsRequestPending] = useState(false)

	const debouncedMovieTitle = useDebounce(movieTitle, 1000)

	async function searchSubtitles(query: string) {
		if (isRequestPending) return

		setIsRequestPending(true)

		try {
			const subtitles = await fetchSubtitles(query)
			console.log(subtitles)

			if (subtitles) {
				setSubtitles(subtitles)
			}
		} catch (e) {
			console.log(e)
		} finally {
			setIsRequestPending(false)
		}
	}

	function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		if (movieTitle && e.key === 'Enter') {
			searchSubtitles(movieTitle)
			setIsRequestPending(true)
		}
	}

	useEffect(() => {
		if (!debouncedMovieTitle) {
			setSubtitles([])
			return
		}
		if (!isRequestPending) {
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
				onKeyDown={onKeyDown}
				placeholder='Enter Movie Title...'
			/>
			{subtitles.length !== 0 && (
				<ul className='search-results'>
					{subtitles.map((subtitle) => (
						<SearchResult key={subtitle.id} subtitle={subtitle} />
					))}
				</ul>
			)}
		</div>
	)
}

export default App
