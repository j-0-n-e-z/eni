import axios from 'axios'

export async function downloadSrt(srtUrl: string) {
	const response = await axios.get<string, { data: string }>(srtUrl, {
		headers: {
			'User-Agent': 'eni v0.0.1'
		},
		responseType: 'text',
		timeout: 3000
	})

	return response.data
}
