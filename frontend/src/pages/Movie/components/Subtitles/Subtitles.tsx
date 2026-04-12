import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { SUBTITLES_PER_PAGE } from '@/constants'
import type { AppDispatch, RootState } from '@/store'
import { clearSubtitles, fetchAndParseSubtitles } from '@/store'
import { EmptyState, ErrorDisplay, Icons } from '@/ui'

import { Paginator, Subtitle } from './components'
import { useSubtitlePagination } from './hooks'
import { SubtitlesSkeleton } from './SubtitlesSkeleton'

import styles from './Subtitles.module.scss'

export const Subtitles = () => {
	const { fileId } = useParams()

	const dispatch = useDispatch<AppDispatch>()
	const { subtitles, isSubtitlesLoading, subtitlesError } = useSelector(
		(state: RootState) => state.subtitlesDownloadReducer
	)

	useEffect(() => {
		dispatch(fetchAndParseSubtitles(Number(fileId)))

		return () => {
			dispatch(clearSubtitles())
		}
	}, [])

	const { currentPage, goToPage, subtitlesStartIdx } = useSubtitlePagination(
		subtitles?.length ?? 0
	)

	if (isSubtitlesLoading) return <SubtitlesSkeleton />

	if (subtitlesError) return <ErrorDisplay error={subtitlesError} />

	if (!subtitles?.length) {
		return (
			<EmptyState
				description='Субтитры не найдены'
				header='Пусто'
				icon={<Icons.Empty />}
			/>
		)
	}

	return (
		<>
			<div className={styles.controlPanel}>
				<Paginator
					currentPage={currentPage}
					goToPage={goToPage}
					isDisabled={false}
					itemsLength={subtitles.length}
					itemsPerPage={SUBTITLES_PER_PAGE}
				/>
			</div>

			<ul className={styles.subtitles}>
				{subtitles
					.slice(subtitlesStartIdx, subtitlesStartIdx + SUBTITLES_PER_PAGE)
					.map((subtitle) => (
						<Subtitle key={`${subtitle.timecode}`} subtitle={subtitle} />
					))}
			</ul>
		</>
	)
}
