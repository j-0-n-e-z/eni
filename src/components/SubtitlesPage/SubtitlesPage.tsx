/* eslint-disable @typescript-eslint/naming-convention */
import cn from 'classnames'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/app/index'
import { Subtitles } from '@/components'
import { selectMovie } from '@/slices'
import { fetchMovie } from '@/thunks'
import { USDFormatter } from '@/utils'

import '../../App.scss'
import styles from './SubtitlesPage.module.scss'

export const SubtitlesPage = () => {
	const { id } = useParams<{ id: string }>()
	const dispatch = useAppDispatch()

	const { movie, tmdbMovie, error, status } = useAppSelector(selectMovie)

	console.log('SubtitlesPage render')

	useEffect(() => {
		if (!id) return
		dispatch(fetchMovie(+id))
	}, [id])

	if (!id) return <div>Не найден id фильма</div>
	if (status === 'pending') return 'Загрузка...'
	if (status === 'rejected') return <div>Ошибка: {error}</div>

	if (!movie) return <div>Фильм не найден</div>

	const {
		title,
		img_url,
		opensubtitles: { current_url, all_url },
		subtitles_file_id,
		rating,
		release_year,
		upload_date
	} = movie

	console.log('@tmdbMovie', tmdbMovie)

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<img alt={`${title} Cover`} className={styles.cover} src={img_url} />
				<div className={styles.details}>
					<a href={current_url} rel='noreferrer' target='_blank'>
						<h3 className={styles.title}>{title}</h3>
					</a>
					<span className={styles.year}>
						<b>Release: </b> {tmdbMovie?.release_date ?? release_year}
					</span>
					<span>
						<b>Rating: </b>⭐{rating}
					</span>
					<span>
						<b>Uploaded: </b>
						{new Date(upload_date).toLocaleDateString('ru-ru')}
					</span>
					{tmdbMovie && (
						<>
							<span>
								<b>Budget: </b>
								{USDFormatter.format(tmdbMovie.budget)}
							</span>
							<span>{tmdbMovie.overview}</span>
						</>
					)}
					<a
						className={cn(styles.allSubs, 'button')}
						href={all_url}
						rel='noreferrer'
						target='_blank'
					>
						All subtitles for this movie
					</a>
				</div>
			</div>
			<Subtitles fileId={subtitles_file_id} />
		</div>
	)
}
