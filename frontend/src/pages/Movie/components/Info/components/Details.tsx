import type { KinopoiskMovie } from '@eni/shared'
import cn from 'classnames'
import { Link } from 'react-router-dom'

import { Icons } from '@/ui'
import { formatMinutesToHours, formatRating } from '@/utils'

import { IMDB_BASE_URL } from '../constants'

import { BoxOffice } from './BoxOffice'

import styles from '../Info.module.scss'

interface DetailsProps {
	movie: KinopoiskMovie
}

export const Details = ({ movie }: DetailsProps) => (
	<div className={styles.details}>
		{movie.slogan && <p className={styles.slogan}>{movie.slogan}</p>}

		{movie.filmLength && (
			<span className={styles.duration}>
				{formatMinutesToHours(movie.filmLength)}
			</span>
		)}

		<ul className={styles.movieMeta}>
			<li className={styles.metaItem}>
				<span className={styles.metaLabel}>Год:</span>
				<span className={styles.metaValue}>{movie.year}</span>
			</li>

			{movie.ratingMpaa && (
				<li className={styles.metaItem}>
					<span className={styles.metaLabel}>Возраст: </span>
					<span className={cn(styles.metaValue, styles.mpaa)}>
						{formatRating(movie.ratingMpaa)}
					</span>
				</li>
			)}

			{movie.ratingImdb && (
				<li className={styles.metaItem}>
					<span className={styles.metaLabel}>Рейтинг: </span>
					<Link
						className={cn(styles.metaValue, styles.imdb)}
						target='_blank'
						to={`${IMDB_BASE_URL}/${movie.imdbId}`}
					>
						{movie.ratingImdb.toFixed(1)}
						<Icons.Imdb className={styles.imdbLogo} />
					</Link>
				</li>
			)}

			{movie.countries?.length > 0 && (
				<li className={styles.metaItem}>
					<span className={styles.metaLabel}>Страны: </span>
					<span className={styles.metaValue}>
						{movie.countries.map(({ country }) => country).join(', ')}
					</span>
				</li>
			)}

			<BoxOffice movie={movie} />
		</ul>

		{movie.genres?.length > 0 && (
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
)
