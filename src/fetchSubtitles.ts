import { Subtitle } from './types'

export const fetchSubtitles = async (
	query: string,
	languages: string[] = ['en'],
	type: string = 'movie'
): Promise<Subtitle[] | null> => {
	const apiKey = import.meta.env.VITE_OPENSUBTITLES_API_KEY
	const url = `https://api.opensubtitles.com/api/v1/subtitles?type=${type}&query=${query}&languages=${languages.join(
		','
	)}&order_by=download_count`

	try {
		const response = await fetch(url, {
			headers: {
				'Api-Key': apiKey,
				'User-Agent': 'eni v1',
				'Content-Type': 'application/json'
			}
		})

		if (!response.ok) {
			throw new Error('Error due request to OpenSubtitles')
		}

		const data = await response.json()
		const allSubtitles = data.data as Subtitle[]
		const uniqueSubtitles = new Map()

		for (const subtitle of allSubtitles) {
			const { title } = subtitle.attributes.feature_details
			if (!uniqueSubtitles.has(title)) {
				uniqueSubtitles.set(title, subtitle)
			}
		}

		console.log(uniqueSubtitles)

		return [...uniqueSubtitles.values()]
	} catch (error) {
		console.error('Ошибка:', error)
		return null
	}
}
