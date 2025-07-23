/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/naming-convention */
import type { FC } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/app/index'
import { Subtitles } from '@/components'
import {
	clearMovie,
	clearTMDBMovie,
	selectMovie,
	selectTMDBMovie
} from '@/slices'
import { fetchMovie, fetchTMDBMovie } from '@/thunks'
import {
	formatMinutesToHours,
	formatToOneDecimal,
	USDateFormatter,
	USDFormatter
} from '@/utils'

import '../../App.scss'

import styles from './SubtitlesPage.module.scss'

export const SubtitlesPage: FC = () => {
	const { id } = useParams<{ id: string }>()
	const dispatch = useAppDispatch()
	const { movie, error, status } = useAppSelector(selectMovie)
	const {
		tmdbMovie,
		error: tmdbError,
		status: tmdbStatus
	} = useAppSelector(selectTMDBMovie)

	useEffect(() => {
		if (!id) return

		dispatch(fetchMovie(+id))

		return () => {
			dispatch(clearMovie())
		}
	}, [id])

	useEffect(() => {
		if (!movie) return

		dispatch(fetchTMDBMovie(movie.tmdb_id))

		return () => {
			dispatch(clearTMDBMovie())
		}
	}, [movie])

	if (!id) return <div>Не найден id фильма</div>
	if (status === 'pending') return <div>...Загрузка</div>
	// TODO: why have rejected when have error (just 'idle' and 'pending')
	if (error) return <div>Ошибка: {error}</div>

	if (!movie) return <div>Фильм не найден</div>

	return (
		<div className={styles.subtitlesPageContainer}>
			<div className={styles.info}>
				<img
					alt={`${movie.title} Cover`}
					className={styles.cover}
					src={movie.img_url}
				/>
				<div className={styles.details}>
					<h3 className={styles.title}>
						<a
							href={movie.opensubtitles.current_url}
							rel='noopener noreferrer'
							target='_blank'
						>
							{tmdbMovie?.original_title ?? movie.title}
						</a>
					</h3>

					<span>
						<b>Released: </b>{' '}
						{tmdbMovie
							? USDateFormatter.format(new Date(tmdbMovie.release_date))
							: movie.release_year}
					</span>

					<span>
						<b>Subtitles rating: </b>⭐ {movie.subtitles.rating}
					</span>
					<span>
						<b>Uploaded: </b>
						{USDateFormatter.format(new Date(movie.upload_date))}
					</span>
					{tmdbStatus === 'pending' && <p>...Loading</p>}
					{tmdbStatus !== 'pending' && tmdbError && <p>{tmdbError}</p>}

					{tmdbMovie && (
						<>
							<span className={styles.rating}>
								<b>Rating: </b>
								<a
									className={styles.imdb}
									href={`https://www.imdb.com/title/${tmdbMovie.imdb_id}`}
									rel='noopener noreferrer'
									target='_blank'
								>
									<img
										alt='imdb'
										className={styles.imdbLogo}
										src='/assets/icon-imdb-logo.svg'
									/>
									{formatToOneDecimal(tmdbMovie.vote_average)}
								</a>
							</span>
							<span>
								<b>Budget: </b>
								{USDFormatter.format(tmdbMovie.budget)}
							</span>
							<span>
								<b>Genres: </b>
								{tmdbMovie.genres.join(', ')}
							</span>
							<span>
								<b>Origin countries: </b>
								{tmdbMovie.origin_countries.join(', ')}
							</span>
							<span>
								<b>Production countries: </b>
								{tmdbMovie.production_countries.join(', ')}
							</span>
							<span>
								<b>Production companies: </b>
								{tmdbMovie.production_companies.join(', ')}
							</span>
							<span>
								<b>Duration: </b>
								{formatMinutesToHours(tmdbMovie.runtime)}
							</span>
							<span>
								<b>Tagline: </b>
								{tmdbMovie.tagline}
							</span>
							<p>{tmdbMovie.overview}</p>
						</>
					)}

					<a
						className={styles.allSubsButton}
						href={movie.opensubtitles.all_url}
						rel='noopener noreferrer'
						target='_blank'
					>
						Check subtitles on OpenSubtitles
					</a>
				</div>
			</div>

			<Subtitles fileId={movie.subtitles.file_id} />
		</div>
	)
}
