import type { FC } from 'react'
import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

import { Paginator, Subtitle } from '@/components'
import { useGetSubtitleByFileIdQuery } from '@/store/api'
import { SUBTITLES_PER_PAGE } from '@/utils'

import styles from './Subtitles.module.scss'

export const Subtitles: FC = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const { movieId, fileId } = useParams()
	const [currentPage, setCurrentPage] = useState(1)
	
	const subtitlesStart = (currentPage - 1) * SUBTITLES_PER_PAGE

	const {
		data: subtitles,
		isLoading: isSubtitlesLoading,
		error: subtitlesError
	} = useGetSubtitleByFileIdQuery(Number(fileId), {
		skip: !fileId
	})

	const goToPage = (page: number) => {
		setCurrentPage(page)
		searchParams.delete('timecode')
		searchParams.set('page', page.toString())
		setSearchParams(searchParams)
	}

	useEffect(() => {
		const page = parseInt(searchParams.get('page') || '1')
		setCurrentPage(page)
	}, [searchParams])

	if (isSubtitlesLoading) return <div>...Загрузка субтитров</div>

	if (subtitlesError) return <div>{JSON.stringify(subtitlesError)}</div>

	if (!subtitles?.length) return <div>Субтитры не найдены</div>

	return (
		<>
			<div className={styles.controlPanel}>
				<Paginator
					currentPage={currentPage}
					goToPage={goToPage}
					itemsLength={subtitles.length}
					itemsPerPage={SUBTITLES_PER_PAGE}
				/>
			</div>
			<ul className={styles.subtitles}>
				{subtitles
					.slice(subtitlesStart, subtitlesStart + SUBTITLES_PER_PAGE)
					.map((subtitle) => (
						<Subtitle
							key={subtitle.timecode}
							fileId={Number(fileId)}
							movieId={Number(movieId)}
							page={currentPage}
							subtitle={subtitle}
						/>
					))}
			</ul>
		</>
	)
}
