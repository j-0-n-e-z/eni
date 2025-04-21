import cn from 'classnames'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { getCompactMovieInfo } from '../../utils/helpers/getDisplayMovieInfo'
import { selectMovie } from '../../store/slices/movieSlice'
import { fetchMovie } from '../../store/thunks/movieThunk'
import { Subtitles } from './Subtitles/Subtitles'
import styles from './SubtitlesPage.module.scss'
import '../../App.scss'

export const SubtitlesPage = () => {
	const { id } = useParams<{ id: string }>()
	const dispatch = useAppDispatch()

	const { movie, error, status } = useAppSelector(selectMovie)

	console.log(movie);

	console.log('🍿 SubtitlesPage render')

	useEffect(() => {
		if (!id) return
		dispatch(fetchMovie(id))
	}, [id])

	if (!id) return <div>Не найден id фильма</div>
	if (status === 'pending') return 'Загрузка...'
	if (status === 'rejected') return <div>Ошибка: {error}</div>

	if (!movie) return <div>Фильм не найден</div>

	const {
		title,
		coverImg,
		rating,
		year,
		subtitleUrl,
		allSubs,
		language,
		uploadDate
	} = getCompactMovieInfo(movie)

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.coverWrapper}>
					<img className={styles.cover} src={coverImg} alt={title + ' Cover'} />
				</div>
				<div className={styles.details}>
					<a href={subtitleUrl} target='_blank'>
						<h3 className={styles.title}>{title}</h3>
					</a>
					<span className={styles.year}>
						<b>Release: </b> {year}
					</span>
					<span>
						<b>Rating: </b>⭐{rating}
					</span>
					<span>
						<b>Language: </b>
						{language}
					</span>
					<span>
						<b>Uploaded: </b>
						{new Date(uploadDate).toLocaleDateString('ru-ru')}
					</span>
					<a
						className={cn(styles.allSubs, 'button')}
						href={allSubs.url}
						target='_blank'
					>
						All subtitles
					</a>
				</div>
			</div>
			<Subtitles fileId={movie.attributes.files[0].file_id} />
		</div>
	)
}
