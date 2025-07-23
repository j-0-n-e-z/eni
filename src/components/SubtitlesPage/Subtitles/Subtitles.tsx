import type { FC } from 'react'
import React, { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/index'
import { Paginator, Subtitle } from '@/components'
import { selectSubtitles } from '@/slices'
import { clearSubtitles } from '@/store/slices/subtitlesSlice'
import { selectWords } from '@/store/slices/wordsSlice'
import { fetchSubtitles } from '@/thunks'
import { SUBTITLES_PER_PAGE } from '@/utils'

import styles from './Subtitles.module.scss'

interface SubtitlesProps {
	fileId: number
}

export const Subtitles: FC<SubtitlesProps> = React.memo(({ fileId }) => {
	const { subtitles, status, error } = useAppSelector(selectSubtitles)
	const { words } = useAppSelector(selectWords)
	const dispatch = useAppDispatch()

	const [currentPage, setCurrentPage] = useState(1)
	const subtitlesStart = (currentPage - 1) * SUBTITLES_PER_PAGE

	useEffect(() => {
		dispatch(fetchSubtitles(fileId))

		return () => {
			dispatch(clearSubtitles())
		}
	}, [fileId])

	if (status === 'pending') return 'Загрузка...'
	if (error) return <div>Ошибка: {error}</div>
	if (!subtitles) return <div>Субтитров почему-то нет :(</div>

	return (
		<>
			<h2 className={styles.header}>Subtitles</h2>
			<div className={styles.controlPanel}>
				<div>{words.map((x) => x.text).join(', ')}</div>
				<Paginator currentPage={currentPage} setCurrentPage={setCurrentPage} />
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
