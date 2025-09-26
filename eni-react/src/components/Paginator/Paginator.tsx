import cn from 'classnames'
import React from 'react'

import { ArrowIcon } from '@/icons'

import styles from './Paginator.module.scss'
import { generatePages } from './generatePages'

interface PaginatorProps {
	isDisabled: boolean
	currentPage: number
	itemsLength: number
	itemsPerPage: number
	goToPage: (page: number) => void
}

export const Paginator: React.FC<PaginatorProps> = ({
	currentPage,
	itemsLength,
	itemsPerPage,
	goToPage,
	isDisabled
}) => {
	const pageCount = Math.ceil(itemsLength / itemsPerPage)

	if (pageCount < 1) return null

	const handlePageNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
		<div className={cn(styles.paginator, { [styles.disabled]: isDisabled })}>
			<div className={styles.pageBtnsContainer}>
				<button
					aria-disabled={currentPage === 1}
					aria-label='previous page'
					className={styles.pageBtn}
					disabled={currentPage === 1}
					onClick={() => goToPage(currentPage - 1)}
				>
					<ArrowIcon className={styles.prevIcon} />
				</button>

				{generatePages(pageCount, currentPage).map((page, index) =>
					page === '...' ? (
						<button
							key={index}
							disabled
							className={cn(styles.pageBtn, styles.ellipsis)}
						>
							...
						</button>
					) : (
						<button
							key={index}
							aria-current={currentPage === page ? 'page' : undefined}
							aria-label={
								currentPage === page
									? `current page ${page}`
									: `go to page ${page}`
							}
							className={cn(styles.pageBtn, {
								[styles.active]: currentPage === page
							})}
							onClick={() => goToPage(page)}
						>
							{page}
						</button>
					)
				)}

				<button
					aria-disabled={currentPage === pageCount}
					aria-label='next page'
					className={styles.pageBtn}
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
				onChange={handlePageNumberChange}
				onKeyDown={(e) => e.key === 'Enter' && goToPage(currentPage)}
			/>
		</div>
	)
}
