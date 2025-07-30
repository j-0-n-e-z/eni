import type { Subtitle } from '@/types'

import { api } from '../axios/instances'

export const fetchSubtitles = async (fileId: number) => {
	const response = await api.post<Subtitle[]>(`/api/subtitles/${fileId}`)
	return response.data
}
