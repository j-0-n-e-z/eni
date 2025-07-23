import type { FC } from 'react'
import { useEffect, useState } from 'react'

import { useAppSelector } from '@/app/index'
import { selectSubtitles } from '@/store/slices'
import { SUBTITLES_PER_PAGE } from '@/utils'

import styles from './Paginator.module.scss'

interface PaginatorProps {
	currentPage: number
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

export const Paginator: FC<PaginatorProps> = ({
	currentPage,
	setCurrentPage
}) => {
	const [pageCount, setPageCount] = useState(0)
	const { subtitles, status } = useAppSelector(selectSubtitles)

	useEffect(() => {
		if (!subtitles) return

		setPageCount(() => {
			const pageCount = subtitles.length / SUBTITLES_PER_PAGE
			if (pageCount % 1 !== 0) return Math.floor(pageCount) + 1
			return pageCount
		})
	}, [subtitles])

	function goToPreviousPage() {
		if (currentPage > 1) setCurrentPage((p) => p - 1)
	}

	function goToNextPage() {
		if (currentPage < pageCount) setCurrentPage((p) => p + 1)
	}

	function goToMedianPage(start: number, end: number, rightOffset: 0 | 1 = 0) {
		setCurrentPage(Math.floor((start + end) / 2) + rightOffset)
	}

	if (!subtitles) return <div>No subs</div>
	if (status === 'pending') return <div>Loading...</div>

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
