import { ArrowIcon } from '@/icons'

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
	let pageCount = items.length / itemsPerPage
	if (pageCount % 1 !== 0) pageCount = Math.floor(pageCount) + 1

	function goToPreviousPage() {
		if (currentPage > 1) setCurrentPage((p) => p - 1)
	}

	function goToNextPage() {
		if (currentPage < pageCount) setCurrentPage((p) => p + 1)
	}

	function goToMedianPage(start: number, end: number, rightOffset: 0 | 1 = 0) {
		setCurrentPage(Math.floor((start + end) / 2) + rightOffset)
	}

	if (items.length === 0) return null

	return (
		<div className={styles.paginator}>
			<div className={styles.buttons}>
				<button
					className={styles.prevBtn}
					disabled={currentPage === 1}
					onClick={goToPreviousPage}
				>
					<ArrowIcon className={styles.prevIcon} />
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

				<button
					className={styles.nextBtn}
					disabled={currentPage === pageCount}
					onClick={goToNextPage}
				>
					<ArrowIcon className={styles.nextIcon} />
				</button>
			</div>
		</div>
	)
}
