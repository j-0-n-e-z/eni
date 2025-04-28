import type { FC } from 'react'
import React, { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/index'
import { Subtitle } from '@/components'
import { selectSubtitles } from '@/slices'
import { fetchSubtitles } from '@/thunks'

import styles from './Subtitles.module.scss'

interface SubtitlesProps {
	fileId: number
}

export const Subtitles: FC<SubtitlesProps> = React.memo(({ fileId }) => {
	const { subtitles, status, error } = useAppSelector(selectSubtitles)
	const dispatch = useAppDispatch()

	console.log('🎬 Subtitles rendered')

	useEffect(() => {
		dispatch(fetchSubtitles(fileId))
	}, [fileId])

	if (status === 'pending') return 'Загрузка...'
	if (error) return <div>Ошибка: {error}</div>
	if (!subtitles) return <div>Субтитров нет почему-то :(</div>

	return (
		<>
			<h2 className={styles.header}>Subtitles</h2>
			<ul className={styles.subtitles}>
				{subtitles.map((subtitle) => (
					<Subtitle key={subtitle.index} subtitle={subtitle} />
				))}
			</ul>
		</>
	)
})
