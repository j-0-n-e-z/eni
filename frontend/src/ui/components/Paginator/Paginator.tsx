import cn from 'classnames'
import { useState } from 'react'

import { Button, Icons, Input } from '@/ui'
import { notifyOnError } from '@/utils'

import { generateButtonTexts } from './generateButtonTexts'

import styles from './Paginator.module.scss'

interface PaginatorProps {
	isDisabled: boolean
	currentPage: number
	itemsLength: number
	itemsPerPage: number
	goToPage: (page: number) => void
}

export const Paginator = ({
	currentPage,
	itemsLength,
	itemsPerPage,
	goToPage,
	isDisabled
}: PaginatorProps) => {
	const [page, setPage] = useState(currentPage)
	const pageCount = Math.ceil(itemsLength / itemsPerPage)

	if (pageCount < 1) return null

	const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			if (page >= 1 && page <= pageCount) goToPage(page)
			else notifyOnError(`Введите число от 1 до ${pageCount}`, 'pageError')
		}
	}

	return (
		<div className={cn(styles.paginator, { [styles.disabled]: isDisabled })}>
			<div className={styles.pageBtnsContainer}>
				<Button
					aria-disabled={currentPage === 1}
					aria-label='previous page'
					className={styles.pageBtn}
					disabled={currentPage === 1}
					onClick={() => goToPage(currentPage - 1)}
				>
					<Icons.Arrow className={styles.prevIcon} />
				</Button>

				{generateButtonTexts(pageCount, currentPage).map((page, index) =>
					page === '...' ? (
						<Button
							key={index}
							disabled
							className={cn(styles.pageBtn, styles.ellipsis)}
						>
							...
						</Button>
					) : (
						<Button
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
						</Button>
					)
				)}

				<Button
					aria-disabled={currentPage === pageCount}
					aria-label='next page'
					className={styles.pageBtn}
					disabled={currentPage === pageCount}
					onClick={() => goToPage(currentPage + 1)}
				>
					<Icons.Arrow className={styles.nextIcon} />
				</Button>
			</div>

			<Input
				aria-label='go to page'
				className={styles.goToPageInput}
				id='goToPageInput'
				inputMode='numeric'
				list='goToPageInputList'
				max={pageCount}
				min={1}
				type='number'
				value={page}
				onChange={(e) => setPage(e.target.valueAsNumber)}
				onKeyDown={onKeyDown}
			/>
		</div>
	)
}
