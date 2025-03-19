import { Subtitle } from './types'

export async function getSubtitles(fileId: number): Promise<Subtitle[]> {
	try {
		const response = await fetch('http://localhost:8080', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				file_id: fileId
			})
		})

		if (!response.ok) {
			console.log(response)
		}

		const subtitles = await response.json()
		return subtitles.parsedSrt as Subtitle[]
	} catch (e) {
		console.error(e)
		throw e
	}
}
