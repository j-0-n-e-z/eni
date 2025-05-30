import type { Subtitle } from '@/types'

import { api } from '../axios/instances'

export const fetchSubtitles = async (fileId: number) => {
	const response = await api.post<Subtitle[]>('/subtitles', {
		file_id: fileId
	})
	return response.data
}
