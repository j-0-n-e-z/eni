import { SUBTITLES_URL } from './constants'
import { Movie } from './types'

export const fetchMovies = async (
	query: string,
	languages: string[] = ['en'],
	type: string = 'movie',
	order_by: string = 'download_count'
): Promise<Movie[]> => {
	const apiKey = import.meta.env.VITE_API_KEY

	// params should be in that specific order to avoid redirection 301
	const params = {
		languages: languages.join(','),
		order_by,
		query,
		type
	}

	const opensubtitleUrl = new URL(SUBTITLES_URL)

	Object.entries(params).forEach(([key, value]) =>
		opensubtitleUrl.searchParams.append(key, value)
	)

	try {
		const response = await fetch(opensubtitleUrl, {
			headers: {
				'Api-Key': apiKey,
				'User-Agent': 'eni/1.0.0',
				'Content-Type': 'application/json'
			}
		})

		if (!response.ok) {
			throw new Error(`Error during request to OpenSubtitles, ${response}`)
		}

		const { data } = await response.json()
		const movies = data as Movie[]
		const uniqueMovies = new Map()

		for (const subtitle of movies) {
			const { title } = subtitle.attributes.feature_details
			if (!uniqueMovies.has(title)) {
				uniqueMovies.set(title, subtitle)
			}
		}

		return [...uniqueMovies.values()]
	} catch (e) {
		throw e
	}
}
