export function generatePages(
	pageCount: number,
	currentPage: number
): (number | '...')[] {
	if (currentPage < 5) return [1, 2, 3, 4, 5, '...', pageCount]

	if (currentPage >= 5 && currentPage <= pageCount - 4)
		return [
			1,
			'...',
			currentPage - 1,
			currentPage,
			currentPage + 1,
			'...',
			pageCount
		]

	return [
		1,
		'...',
		pageCount - 4,
		pageCount - 3,
		pageCount - 2,
		pageCount - 1,
		pageCount
	]
}
