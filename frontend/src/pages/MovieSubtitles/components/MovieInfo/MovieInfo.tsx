import cn from 'classnames'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useGetMovieBoxOfficeByKinopoiskIdQuery } from '@/store/api'
import type { KinopoiskMovie } from '@/types'
import { Container, Icons, Skeleton } from '@/ui'
import {
	formatMinutesToHours,
	formatMoney,
	formatRating,
	notifyOnError
} from '@/utils'

import styles from './MovieInfo.module.scss'

interface MovieInfoProps {
	movie: KinopoiskMovie
}

export const MovieInfo = ({ movie }: MovieInfoProps) => {
	const {
		data: boxOffice,
		error: boxOfficeError,
		isFetching: isBoxOfficeFetching
	} = useGetMovieBoxOfficeByKinopoiskIdQuery(movie.kinopoiskId, {
		skip: !movie.kinopoiskId
	})
	const [isShowOriginalTitle, setIsShowOriginalTitle] = useState(true)
	const [isMovieInfoHidden, setIsMovieInfoHidden] = useState(false)

	const budget = boxOffice?.items.find((item) => item.type === 'BUDGET')
	const boxOfficeWorld = boxOffice?.items.find((item) => item.type === 'WORLD')

	useEffect(() => {
		if (boxOfficeError)
			notifyOnError('Faild to load budget and box office', 'boxOfficeError')
	}, [boxOfficeError])

	const toggleHideMovieInfo = () => {
		setIsMovieInfoHidden((p) => !p)
	}

	return (
		<section
			className={cn(styles.movieInfoSection, {
				[styles.hidden]: isMovieInfoHidden
			})}
		>
			<h2>
				<Container className={styles.toggleTitleWrapper}>
					<div className={styles.toggleTitle}>
						<Link
							className={styles.titleLink}
							target='_blank'
							to={`https://www.imdb.com/title/${movie.imdbId}`}
						>
							{isShowOriginalTitle
								? (movie.nameOriginal ?? movie.nameRu)
								: (movie.nameRu ?? 'Отсутствует название на русском языке')}
						</Link>
						{movie.nameOriginal && (
							<Icons.Translate
								className={styles.translateTitleIcon}
								onClick={() => setIsShowOriginalTitle((p) => !p)}
							/>
						)}
					</div>
				</Container>
			</h2>
			<div className={styles.toggleInfo}>
				<Container className={styles.heroContainer}>
					<Link target='_blank' to={movie.webUrl}>
						<div className={styles.cover}>
							<img
								alt={`${movie.nameOriginal} Cover`}
								className={styles.coverImg}
								src={movie.posterUrl}
							/>
						</div>
					</Link>
					<div className={styles.movieInfoWrapper}>
						<h2 className={styles.titleWrapper}>
							<a
								className={styles.titleLink}
								href={`https://www.imdb.com/title/${movie.imdbId}`}
								rel='noopener noreferrer'
								target='_blank'
							>
								{isShowOriginalTitle
									? (movie.nameOriginal ?? movie.nameRu)
									: (movie.nameRu ?? 'Отсутствует название на русском языке')}
							</a>
							{movie.nameOriginal && (
								<Icons.Translate
									className={styles.translateTitleIcon}
									onClick={() => setIsShowOriginalTitle((p) => !p)}
								/>
							)}
						</h2>

						<div className={styles.details}>
							{movie.slogan && <p className={styles.slogan}>{movie.slogan}</p>}
							{movie.filmLength && (
								<span className={styles.duration}>
									{formatMinutesToHours(movie.filmLength)}
								</span>
							)}
							<div className={styles.movieMeta}>
								<div className={styles.metaItem}>
									<span className={styles.metaLabel}>Год:</span>
									<span className={styles.metaValue}>{movie.year}</span>
								</div>

								{movie.ratingMpaa && (
									<div className={styles.metaItem}>
										<span className={styles.metaLabel}>Возраст: </span>
										<span className={cn(styles.metaValue, styles.mpaa)}>
											{formatRating(movie.ratingMpaa)}
										</span>
									</div>
								)}

								{movie.ratingImdb && (
									<div className={styles.metaItem}>
										<span className={styles.metaLabel}>Рейтинг: </span>
										<a
											className={cn(styles.metaValue, styles.imdb)}
											href={`https://www.imdb.com/title/${movie.imdbId}`}
											rel='noopener noreferrer'
											target='_blank'
										>
											{movie.ratingImdb.toFixed(1)}
											<Icons.Imdb className={styles.imdbLogo} />
										</a>
									</div>
								)}

								{movie.countries && (
									<div className={styles.metaItem}>
										<span className={styles.metaLabel}>Страны: </span>
										<span className={styles.metaValue}>
											{movie.countries.map(({ country }) => country).join(', ')}
										</span>
									</div>
								)}

								{isBoxOfficeFetching ? (
									<>
										<Skeleton width='10rem' />
										<Skeleton width='10rem' />
									</>
								) : (
									<>
										{budget && (
											<div className={styles.metaItem}>
												<span className={styles.metaLabel}>Бюджет:</span>
												<span className={cn(styles.metaValue, styles.budget)}>
													{formatMoney(
														budget.amount,
														budget.currencyCode || budget.symbol || 'USD'
													)}
												</span>
											</div>
										)}
										{boxOfficeWorld && (
											<div className={styles.metaItem}>
												<span className={styles.metaLabel}>Сборы:</span>
												<span
													className={cn(styles.metaValue, styles.boxOffice)}
												>
													{formatMoney(
														boxOfficeWorld.amount,
														boxOfficeWorld.currencyCode || 'USD'
													)}
												</span>
											</div>
										)}
									</>
								)}
							</div>
							{movie.genres && (
								<ul className={styles.genres}>
									{movie.genres.map(({ genre }) => (
										<li key={genre} className={styles.genre}>
											{genre}
										</li>
									))}
								</ul>
							)}
							{movie.shortDescription && (
								<p className={styles.description}>{movie.shortDescription}</p>
							)}
							{movie.productionStatus && (
								<span className={styles.productionStatus}>
									<b>Production Status: </b>
									{movie.productionStatus}
								</span>
							)}
						</div>
					</div>
				</Container>
			</div>

			<button
				aria-label={`${isMovieInfoHidden ? 'show' : 'hide'} movie info`}
				className={styles.toggleMovieInfoBtn}
				onClick={toggleHideMovieInfo}
			>
				<Icons.Arrow />
			</button>
		</section>
	)
}
