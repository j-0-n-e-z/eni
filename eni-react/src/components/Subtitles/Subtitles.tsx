import type { FC } from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Paginator, Subtitle } from '@/components'
import type { PureSubtitle, Word } from '@/types'
import { SUBTITLES_PER_PAGE } from '@/utils'

import styles from './Subtitles.module.scss'

interface SubtitlesProps {
	subtitles: PureSubtitle[]
	fileId: number
	lookupWord: Word | undefined
}

export const Subtitles: FC<SubtitlesProps> = ({
	subtitles,
	fileId,
	lookupWord
}) => {
	const [currentPage, setCurrentPage] = useState(1)
	const subtitlesStart = (currentPage - 1) * SUBTITLES_PER_PAGE
	const { id: movieId } = useParams()

	useEffect(() => {
		if (lookupWord) {
			setCurrentPage(lookupWord.from.page)
		}
	}, [])

	return (
		<>
			<div className={styles.controlPanel}>
				<Paginator
					currentPage={currentPage}
					itemsLength={subtitles.length}
					itemsPerPage={SUBTITLES_PER_PAGE}
					onPageChange={(p) => setCurrentPage(p)}
				/>
			</div>
			<ul className={styles.subtitles}>
				{subtitles
					.slice(subtitlesStart, subtitlesStart + SUBTITLES_PER_PAGE)
					.map((subtitle) => (
						<Subtitle
							key={subtitle.timecode}
							fileId={fileId}
							lookupWord={lookupWord}
							movieId={+movieId!}
							page={currentPage}
							subtitle={subtitle}
						/>
					))}
			</ul>
		</>
	)
}
