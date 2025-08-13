import type { FC } from 'react'
import { useState } from 'react'

import { useGetSubtitlesByIdQuery } from '@/api'
import { Paginator, Subtitle } from '@/components'
import { SUBTITLES_PER_PAGE } from '@/utils'

import styles from './Subtitles.module.scss'

interface SubtitlesProps {
	imdbId: string | null
}

export const Subtitles: FC<SubtitlesProps> = ({ imdbId }) => {
	const {
		data: subtitles,
		isLoading,
		error
	} = useGetSubtitlesByIdQuery(imdbId, { skip: !imdbId })

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
