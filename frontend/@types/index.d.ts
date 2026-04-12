interface MovieContext {
	kinopoiskId: number
	imdbId: string | null
	title: string
	posterUrl: string
}

interface BackendError {
	data?: {
		error: {
			statusCode: number
			code: string
			message: string
			details?: { field: 'email' | 'password' }
		}
	}
	status: number
}

interface SubtitlesInfo {
	link: string
	file_name: string
}
