import type { FC } from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useGetSubtitleByFileIdQuery } from '@/api'
import { Paginator, Subtitle } from '@/components'
import type { Word } from '@/types'
import { SUBTITLES_PER_PAGE } from '@/utils'

import styles from './Subtitles.module.scss'

interface SubtitlesProps {
	fileId: number
	lookupWord?: Word
}

export const Subtitles: FC<SubtitlesProps> = ({ fileId, lookupWord }) => {
	const [currentPage, setCurrentPage] = useState(1)
	const subtitlesStart = (currentPage - 1) * SUBTITLES_PER_PAGE
	const { id: movieId } = useParams()
	const {
		data: subtitles,
		isLoading: isSubtitlesLoading,
		error: subtitlesError
	} = useGetSubtitleByFileIdQuery(fileId, {
		skip: !fileId
	})

	useEffect(() => {
		if (lookupWord) {
			setCurrentPage(lookupWord.from.page)
		}
	}, [])

	if (isSubtitlesLoading) return <div>...Загрузка субтитров</div>

	if (!isSubtitlesLoading && subtitlesError)
		return <div>{JSON.stringify(subtitlesError)}</div>

	if (!isSubtitlesLoading && (!subtitles || subtitles.length === 0))
		return <div>Субтитры не найдены</div>

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
