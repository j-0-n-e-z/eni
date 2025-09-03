import React from 'react'

import { ArrowIcon } from '@/icons'

import styles from './Paginator.module.scss'
import { generatePages } from './generatePages'

interface PaginatorProps {
	currentPage: number
	itemsLength: number
	itemsPerPage: number
	goToPage: (page: number) => void
}

export const Paginator: React.FC<PaginatorProps> = ({
	currentPage,
	itemsLength,
	itemsPerPage,
	goToPage
}) => {
	const pageCount = Math.ceil(itemsLength / itemsPerPage)

	if (pageCount < 1) return null

	const handleGoToPage = (e: React.ChangeEvent<HTMLInputElement>) => {
		const pageNumber = Number(e.target.value)

		if (Number.isNaN(pageNumber) || pageNumber === 0) {
			goToPage(1)
			return
		}

		if (pageNumber > pageCount) {
			goToPage(pageCount)
			return
		}

		goToPage(pageNumber)
	}

	return (
		<div className={styles.paginator}>
			<div className={styles.buttons}>
				<button
					aria-disabled={currentPage === 1}
					aria-label='previous page'
					className={styles.prevBtn}
					disabled={currentPage === 1}
					onClick={() => goToPage(currentPage - 1)}
				>
					<ArrowIcon className={styles.prevIcon} />
				</button>

				{generatePages(pageCount, currentPage).map((page, index) =>
					page === '...' ? (
						<button key={index} disabled className={styles.ellipsis}>
							...
						</button>
					) : (
						<button
							key={index}
							aria-current={currentPage === page ? 'page' : undefined}
							className={currentPage === page ? styles.active : ''}
							aria-label={
								currentPage === page
									? `current page ${page}`
									: `go to page ${page}`
							}
							onClick={() => goToPage(page)}
						>
							{page}
						</button>
					)
				)}

				<button
					aria-disabled={currentPage === pageCount}
					aria-label='next page'
					className={styles.nextBtn}
					disabled={currentPage === pageCount}
					onClick={() => goToPage(currentPage + 1)}
				>
					<ArrowIcon className={styles.nextIcon} />
				</button>
			</div>
			<input
				aria-label='go to page'
				className={styles.goToPageInput}
				id='goToPageInput'
				inputMode='numeric'
				list='goToPageInputList'
				max={pageCount}
				min={1}
				value={currentPage}
				onChange={handleGoToPage}
				onKeyDown={(e) => e.key === 'Enter' && goToPage(currentPage)}
			/>
		</div>
	)
}
