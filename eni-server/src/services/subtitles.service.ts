import { openSubtitlesApi, openSubtitlesApiAuthed } from '@/api'
import type { MovieSubtitle } from '@/shared-types'
import { fetchSrtFile, parseSrt } from '@/utils'

import type { OSMovieSubtitle, SubtitlesInfo } from '../types'

export class SubtitleService {
	async findMovieSubtitles(query: string) {
		const params: Record<string, string> = {
			type: 'movie',
			languages: 'en',
			order_by: 'points'
		}

		if (query.startsWith('tt')) {
			params.imdb_id = query
		} else {
			params.query = query
		}

		const response = await openSubtitlesApi.get<{ data: OSMovieSubtitle[] }>(
			`/subtitles`,
			{
				params
			}
		)

		return response.data.data
			.filter((m) => m.attributes.files.length)
			.map(this.mapOSMovieSubtitleToMovie)
	}

	async getSubtitlesByFileId(fileId: number) {
		const response = await openSubtitlesApiAuthed.post<SubtitlesInfo>(
			'/download',
			{
				file_id: fileId
			}
		)

		const srtUrl = response.data.link
		const srtContent = await fetchSrtFile(srtUrl, response.data.file_name)

		return parseSrt(srtContent)
	}

	private mapOSMovieSubtitleToMovie(
		osMovieSubtitle: OSMovieSubtitle
	): MovieSubtitle {
		return {
			upload_date: osMovieSubtitle.attributes.upload_date,
			id: osMovieSubtitle.id,
			tmdb_id: osMovieSubtitle.attributes.feature_details.tmdb_id,
			imdb_id: osMovieSubtitle.attributes.feature_details.imdb_id,
			release_year: osMovieSubtitle.attributes.feature_details.year,
			download_count: osMovieSubtitle.attributes.download_count,
			uploader: osMovieSubtitle.attributes.uploader.name,
			title: osMovieSubtitle.attributes.feature_details.title,
			opensubtitles: {
				current_url: osMovieSubtitle.attributes.url,
				all_url: osMovieSubtitle.attributes.related_links[0].url
			},
			img_url: osMovieSubtitle.attributes.related_links[0].img_url,
			subtitles: {
				rating: osMovieSubtitle.attributes.ratings,
				file_id: osMovieSubtitle.attributes.files[0].file_id
			}
		}
	}
}
