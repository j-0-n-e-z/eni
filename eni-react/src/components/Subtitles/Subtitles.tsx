import type { FC } from 'react'
import { useEffect, useState } from 'react'
import { useOutletContext, useParams } from 'react-router-dom'

import { Paginator, Subtitle } from '@/components'
import type { MovieSubtitlesContext } from '@/frontend-types'
import { useGetSubtitleByFileIdQuery } from '@/store/api'
import { SUBTITLES_PER_PAGE } from '@/utils'

import styles from './Subtitles.module.scss'

export const Subtitles: FC = () => {
	const { lookupWord } = useOutletContext<MovieSubtitlesContext>()
	const [currentPage, setCurrentPage] = useState(1)
	const subtitlesStart = (currentPage - 1) * SUBTITLES_PER_PAGE
	const { movieId, fileId } = useParams()

	const {
		data: subtitles,
		isLoading: isSubtitlesLoading,
		error: subtitlesError
	} = useGetSubtitleByFileIdQuery(Number(fileId), {
		skip: !fileId
	})

	useEffect(() => {
		if (lookupWord) {
			setCurrentPage(lookupWord.from.page)
		}
	}, [lookupWord])

	if (isSubtitlesLoading) return <div>...Загрузка субтитров</div>

	if (subtitlesError) return <div>{JSON.stringify(subtitlesError)}</div>

	if (!subtitles?.length) return <div>Субтитры не найдены</div>

	return (
		<section className={styles.subtitlesSection}>
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
							fileId={Number(fileId)}
							lookupWord={lookupWord}
							movieId={Number(movieId)}
							page={currentPage}
							subtitle={subtitle}
						/>
					))}
			</ul>
		</section>
	)
}
