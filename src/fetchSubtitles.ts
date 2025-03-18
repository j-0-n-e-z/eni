import { SUBTITLES_URL } from './constants'
import { Subtitle } from './types'

export const fetchSubtitles = async (
	query: string,
	languages: string[] = ['en'],
	type: string = 'movie',
	order_by: string = 'download_count'
): Promise<Subtitle[]> => {
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
		const subtitles = data as Subtitle[]
		const uniqueSubtitles = new Map()

		for (const subtitle of subtitles) {
			const { title } = subtitle.attributes.feature_details
			if (!uniqueSubtitles.has(title)) {
				uniqueSubtitles.set(title, subtitle)
			}
		}

		return [...uniqueSubtitles.values()]
	} catch (e) {
		throw e
	}
}
