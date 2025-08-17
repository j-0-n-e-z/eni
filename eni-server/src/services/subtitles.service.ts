import {
	openSubtitlesApi,
	openSubtitlesApiAuthed
} from '../api/openSubtitlesApi'
import type { MovieSubtitle, OSMovieSubtitle, SubtitlesInfo } from '../types'
import { fetchSubtitlesSrtFile } from '../utils/subtitles/fetchSubtitlesSrt'
import { parseSrt } from '../utils/subtitles/parseSrt'

export class SubtitleService {
	async findMovieSubtitlesByImdbId(imdbId: string) {
		const response = await openSubtitlesApi.get<{ data: OSMovieSubtitle[] }>(
			`/subtitles`,
			{
				params: {
					imdb_id: imdbId,
					type: 'movie',
					languages: 'en',
					order_by: 'points'
				}
			}
		)

		console.log(
			response.data.data.map((x) => ({
				uploader: x.attributes.uploader,
				feature_details: x.attributes.feature_details
			}))
		)

		return response.data.data
			.filter((m) => m.attributes.files.length !== 0)
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
		const srtContent = await fetchSubtitlesSrtFile(
			srtUrl,
			response.data.file_name
		)

		return parseSrt(srtContent)
	}

	private mapOSMovieSubtitleToMovie(
		OSMovieSubtitle: OSMovieSubtitle
	): MovieSubtitle {
		return {
			upload_date: OSMovieSubtitle.attributes.upload_date,
			id: OSMovieSubtitle.id,
			tmdb_id: OSMovieSubtitle.attributes.feature_details.tmdb_id,
			imdb_id: OSMovieSubtitle.attributes.feature_details.imdb_id,
			release_year: OSMovieSubtitle.attributes.feature_details.year,
			download_count: OSMovieSubtitle.attributes.download_count,
			uploader: OSMovieSubtitle.attributes.uploader.name,
			title: OSMovieSubtitle.attributes.feature_details.title,
			opensubtitles: {
				current_url: OSMovieSubtitle.attributes.url,
				all_url: OSMovieSubtitle.attributes.related_links[0].url
			},
			img_url: OSMovieSubtitle.attributes.related_links[0].img_url,
			subtitles: {
				rating: OSMovieSubtitle.attributes.ratings,
				file_id: OSMovieSubtitle.attributes.files[0].file_id
			}
		}
	}
}
