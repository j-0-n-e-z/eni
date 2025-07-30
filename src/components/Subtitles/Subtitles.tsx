import type { FC } from 'react'
import React, { useState } from 'react'

import { useGetSubtitlesByIdQuery } from '@/api'
import { Paginator, Subtitle } from '@/components'
import { SUBTITLES_PER_PAGE } from '@/utils'

import styles from './Subtitles.module.scss'

interface SubtitlesProps {
	fileId: number
}

export const Subtitles: FC<SubtitlesProps> = React.memo(({ fileId }) => {
	const {
		data: subtitles,
		isLoading,
		error
	} = useGetSubtitlesByIdQuery(fileId, { skip: !fileId })

	const [currentPage, setCurrentPage] = useState(1)
	const subtitlesStart = (currentPage - 1) * SUBTITLES_PER_PAGE

	if (isLoading) return 'Загрузка...'
	if (error)
		return (
			<div>
				Ошибка:{' '}
				{'message' in error ? error.message : 'Ошибка загрузки субтитров'}
			</div>
		)
	if (!subtitles) return <div>Субтитров почему-то нет :(</div>

	return (
		<>
			<h2 className={styles.header}>Subtitles</h2>
			<div className={styles.controlPanel}>
				<Paginator
					currentPage={currentPage}
					items={subtitles}
					itemsPerPage={SUBTITLES_PER_PAGE}
					setCurrentPage={setCurrentPage}
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
})
