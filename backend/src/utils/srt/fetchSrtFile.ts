import axios from 'axios'

import { ApiError, ErrorCodes } from '@/utils'

import { saveSrtFile } from './saveSrtFile'

export async function fetchSrtFile(strUrl: string, srtFilename?: string) {
	try {
		const response = await axios.get<string, { data: string }>(strUrl, {
			timeout: 10000,
			responseType: 'text'
		})

		if (srtFilename) {
			saveSrtFile(response.data, srtFilename)
		}

		return response.data
	} catch (error) {
		throw new ApiError(
			503,
			'Failed to download subtitles',
			ErrorCodes.BAD_REQUEST
		)
	}
}
