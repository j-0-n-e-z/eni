import React, { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { selectSubtitles } from '../../../store/slices/subtitlesSlice'
import { fetchSubtitles } from '../../../store/thunks/subtitlesThunk'
import { Subtitle } from './Subtitle/Subtitle'
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
					<Subtitle subtitle={subtitle} key={subtitle.index} />
				))}
			</ul>
		</>
	)
})
