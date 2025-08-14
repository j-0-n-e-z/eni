import type { FC } from 'react'
import { useState } from 'react'

import { Paginator, Subtitle } from '@/components'
import type { Subtitle as ISubtitle } from '@/types'
import { SUBTITLES_PER_PAGE } from '@/utils'

import styles from './Subtitles.module.scss'

interface SubtitlesProps {
	subtitles: ISubtitle[]
}

export const Subtitles: FC<SubtitlesProps> = ({ subtitles }) => {
	const [currentPage, setCurrentPage] = useState(1)
	const subtitlesStart = (currentPage - 1) * SUBTITLES_PER_PAGE

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
						<Subtitle key={subtitle.id} subtitle={subtitle} />
					))}
			</ul>
		</>
	)
}
