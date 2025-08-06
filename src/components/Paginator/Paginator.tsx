import { useEffect, useState } from 'react'

import styles from './Paginator.module.scss'

interface PaginatorProps<T> {
	currentPage: number
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>
	items: T[]
	itemsPerPage: number
}

export const Paginator = <T,>({
	currentPage,
	setCurrentPage,
	items,
	itemsPerPage
}: PaginatorProps<T>) => {
	const [pageCount, setPageCount] = useState(0)

	useEffect(() => {
		if (!items) return

		setPageCount(() => {
			const pageCount = items.length / itemsPerPage
			if (pageCount % 1 !== 0) return Math.floor(pageCount) + 1
			return pageCount
		})
	}, [items])

	function goToPreviousPage() {
		if (currentPage > 1) setCurrentPage((p) => p - 1)
	}

	function goToNextPage() {
		if (currentPage < pageCount) setCurrentPage((p) => p + 1)
	}

	function goToMedianPage(start: number, end: number, rightOffset: 0 | 1 = 0) {
		setCurrentPage(Math.floor((start + end) / 2) + rightOffset)
	}

	if (!items || items.length === 0) return null

	return (
		<div className={styles.paginator}>
			<div className={styles.buttons}>
				<button disabled={currentPage === 1} onClick={goToPreviousPage}>
					<img
						alt='<'
						className={styles.prevIcon}
						src='/assets/icons/icon-arrow.svg'
					/>
				</button>

				{currentPage > 2 && (
					<>
						<button onClick={() => setCurrentPage(1)}>1</button>
						{currentPage > 3 && (
							<button onClick={() => goToMedianPage(1, currentPage)}>
								...
							</button>
						)}
					</>
				)}

				{currentPage === 1 && (
					<>
						<button className={styles.active} onClick={() => setCurrentPage(1)}>
							1
						</button>
						<button onClick={() => setCurrentPage(2)}>2</button>
						<button onClick={() => setCurrentPage(3)}>3</button>
					</>
				)}

				{currentPage === pageCount && (
					<>
						<button onClick={() => setCurrentPage(pageCount - 2)}>
							{pageCount - 2}
						</button>
						<button onClick={() => setCurrentPage(pageCount - 1)}>
							{pageCount - 1}
						</button>
						<button
							className={styles.active}
							onClick={() => setCurrentPage(pageCount)}
						>
							{pageCount}
						</button>
					</>
				)}

				{currentPage !== 1 && currentPage !== pageCount && (
					<>
						<button onClick={() => setCurrentPage(currentPage - 1)}>
							{currentPage - 1}
						</button>
						<button
							className={styles.active}
							onClick={() => setCurrentPage(currentPage)}
						>
							{currentPage}
						</button>
						<button onClick={() => setCurrentPage(currentPage + 1)}>
							{currentPage + 1}
						</button>
					</>
				)}

				{currentPage < pageCount - 1 && (
					<>
						{currentPage < pageCount - 2 && (
							<button onClick={() => goToMedianPage(currentPage, pageCount, 1)}>
								...
							</button>
						)}
						<button onClick={() => setCurrentPage(pageCount)}>
							{pageCount}
						</button>
					</>
				)}

				<button disabled={currentPage === pageCount} onClick={goToNextPage}>
					<img
						alt='<'
						className={styles.nextIcon}
						src='/assets/icons/icon-arrow.svg'
					/>
				</button>
			</div>
		</div>
	)
}
