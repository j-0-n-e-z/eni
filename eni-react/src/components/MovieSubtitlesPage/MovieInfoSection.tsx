import cn from 'classnames'
import { useEffect, useState, type FC } from 'react'
import toast from 'react-hot-toast'

import { ImdbIcon, TranslateIcon } from '@/icons'
import { useGetMovieBoxOfficeByKinopoiskIdQuery } from '@/store/api'
import type { KinopoiskMovie } from '@/types'
import { formatMinutesToHours, formatMoney, formatRating } from '@/utils'

import styles from './MovieSubtitlesPage.module.scss'

interface MovieInfoSectionProps {
	movie: KinopoiskMovie
}

export const MovieInfoSection: FC<MovieInfoSectionProps> = ({ movie }) => {
	const {
		data: boxOffice,
		error: boxOfficeError,
		isLoading: isBoxOfficeLoading
	} = useGetMovieBoxOfficeByKinopoiskIdQuery(movie.kinopoiskId, {
		skip: !movie.kinopoiskId
	})
	const [isShowOriginalTitle, setIsShowOriginalTitle] = useState(true)

	const budget = boxOffice?.items.find((item) => item.type === 'BUDGET')
	const boxOfficeWorld = boxOffice?.items.find((item) => item.type === 'WORLD')

	useEffect(() => {
		if (boxOfficeError)
			toast.error('Faild to load budget and box office', { id: 'boxOfficeError' })
	}, [boxOfficeError])

	return (
		<section className={styles.movieSection}>
			<div className={styles.heroContainer}>
				<img
					alt={`${movie.nameOriginal} Cover`}
					className={styles.cover}
					src={movie.posterUrl}
				/>
				<div className={styles.details}>
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
							<TranslateIcon
								className={styles.translateTitleIcon}
								onClick={() => setIsShowOriginalTitle((p) => !p)}
							/>
						)}
					</h2>

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

						{isBoxOfficeLoading ? (
							<div>...Загрузка бокс-офиса</div>
						) : (
							<>
								{budget && (
									<div className={styles.metaItem}>
										<span className={styles.metaLabel}>Бюджет:</span>
										<span className={cn(styles.metaValue, styles.budget)}>
											{formatMoney(budget.amount, budget.currencyCode)}
										</span>
									</div>
								)}
								{boxOfficeWorld && (
									<div className={styles.metaItem}>
										<span className={styles.metaLabel}>Сборы:</span>
										<span className={cn(styles.metaValue, styles.boxOffice)}>
											{formatMoney(
												boxOfficeWorld.amount,
												boxOfficeWorld.currencyCode
											)}
										</span>
									</div>
								)}
							</>
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
									<ImdbIcon className={styles.imdbLogo} />
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
						<span>
							<b>Production Status: </b>
							{movie.productionStatus}
						</span>
					)}
				</div>
			</div>
		</section>
	)
}
