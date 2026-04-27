import { useCallback, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { SUBTITLES_PER_PAGE } from '@/constants'

export const useSubtitlePagination = (subtitlesLength: number) => {
	const [searchParams, setSearchParams] = useSearchParams()
	const [currentPage, setCurrentPage] = useState(() =>
		parseInt(searchParams.get('page') || '1')
	)

	const subtitlesStartIdx = (currentPage - 1) * SUBTITLES_PER_PAGE
	const totalPages = Math.ceil(subtitlesLength / SUBTITLES_PER_PAGE)

	const goToPage = useCallback((page: number) => {
		setCurrentPage(page)
		searchParams.delete('timecode')
		searchParams.set('page', page.toString())
		setSearchParams(searchParams)
	}, [])

	return {
		currentPage,
		goToPage,
		subtitlesStartIdx,
		totalPages
	}
}
