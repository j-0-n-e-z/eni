import https from 'https'
import { saveSrtFile } from './saveSrt'

export function fetchSubtitlesSrtFile(srtUrl: string, srtFilename?: string) {
	return new Promise<string>((resolve, reject) => {
		https.get(srtUrl, (res) => {
			let rawData = ''
			res.on('data', (chunk) => (rawData += chunk))
			res.on('end', () => {
				if (srtFilename) {
					saveSrtFile(rawData, srtFilename)
				}
				resolve(rawData)
			})
			res.on('error', reject)
		})
	})
}
