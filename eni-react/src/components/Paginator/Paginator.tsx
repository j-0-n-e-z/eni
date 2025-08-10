import React from 'react'

import { ArrowIcon } from '@/icons'

import styles from './Paginator.module.scss'
import { generatePages } from './generatePages'

interface PaginatorProps {
	currentPage: number
	itemsLength: number
	itemsPerPage: number
	onPageChange: (page: number) => void
}

export const Paginator: React.FC<PaginatorProps> = ({
	currentPage,
	itemsLength,
	itemsPerPage,
	onPageChange
}) => {
	const pageCount = Math.ceil(itemsLength / itemsPerPage)

	if (pageCount <= 1) return null

	return (
		<div className={styles.paginator}>
			<div className={styles.buttons}>
				<button
					aria-disabled={currentPage === 1}
					aria-label='previous page'
					className={styles.prevBtn}
					disabled={currentPage === 1}
					onClick={() => onPageChange(currentPage - 1)}
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
							onClick={() => onPageChange(page)}
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
					onClick={() => onPageChange(currentPage + 1)}
				>
					<ArrowIcon className={styles.nextIcon} />
				</button>
			</div>
		</div>
	)
}
