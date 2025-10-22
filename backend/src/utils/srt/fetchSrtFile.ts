import axios from 'axios'

import { ApiError } from '../errors/ApiError'
import { ErrorCodes } from '../errors/ErrorCodes'

import { saveSrtFile } from './saveSrtFile'

export async function fetchSrtFile(strUrl: string, srtFilename?: string) {
	try {
		const response = await axios.get(strUrl, {
			timeout: 10000,
			responseType: 'text'
		})

		console.log(response)

		if (srtFilename) {
			saveSrtFile(response.data, srtFilename)
		}

		return response.data
	} catch (error) {
		console.log(error)
		throw new ApiError(
			503,
			'Failed to download subtitles',
			ErrorCodes.BAD_REQUEST
		)
	}
}
