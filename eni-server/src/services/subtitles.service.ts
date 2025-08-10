import { openSubtitlesApiAuthed } from '../api/openSubtitlesApi'
import { SubtitlesInfo } from '../types'
import { fetchSubtitlesSrtFile } from '../utils/subtitles/fetchSubtitlesSrt'
import { parseSrt } from '../utils/subtitles/parseSrt'

export class SubtitleService {
	async downloadSubtitle(fileId: string) {
		const response = await openSubtitlesApiAuthed.post<SubtitlesInfo>(
			'/download',
			{
				file_id: fileId
			}
		)

		console.log(response.data);
		const srtUrl = response.data.link
		const srtContent = await fetchSubtitlesSrtFile(
			srtUrl,
			response.data.file_name
		)

		return parseSrt(srtContent)
	}
}
