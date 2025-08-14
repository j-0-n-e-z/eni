import type { FC } from 'react'

import { ImdbIcon } from '@/icons'
import type { KinopoiskMovie } from '@/types'
import { formatToOneDecimal, USDFormatter } from '@/utils'

import styles from './MovieSubtitlesPage.module.scss'

interface MovieInfoSectionProps {
	movie: KinopoiskMovie
	budget?: { amount: number }
	world?: { amount: number }
	isBoxOfficeLoading: boolean
}

export const MovieInfoSection: FC<MovieInfoSectionProps> = ({
	movie,
	budget,
	world,
	isBoxOfficeLoading
}) => (
	<section className={styles.info}>
		<img
			alt={`${movie.nameOriginal} Cover`}
			className={styles.cover}
			src={movie.posterUrl}
		/>
		<div className={styles.details}>
			<h2 className={styles.title}>
				<a
					href={`https://www.imdb.com/title/${movie.imdbId}`}
					rel='noopener noreferrer'
					target='_blank'
				>
					{movie.nameOriginal}
				</a>
			</h2>

			<span>
				<b>Released: </b> {movie.year}
			</span>

			{movie.ratingMpaa && (
				<span>
					<b>MPAA Rating: </b> {movie.ratingMpaa.toUpperCase()}
				</span>
			)}

			{isBoxOfficeLoading && <div>...Загрузка бокс-офиса</div>}
			{budget && (
				<div>
					<b>Budget:</b> {USDFormatter.format(budget.amount)}
				</div>
			)}
			{world && (
				<div>
					<b>Box office:</b> {USDFormatter.format(world.amount)}
				</div>
			)}

			{movie.ratingImdb && (
				<span className={styles.rating}>
					<b>Rating: </b>
					<a
						className={styles.imdb}
						href={`https://www.imdb.com/title/${movie.imdbId}`}
						rel='noopener noreferrer'
						target='_blank'
					>
						<ImdbIcon className={styles.imdbLogo} />
						{formatToOneDecimal(movie.ratingImdb)}
					</a>
				</span>
			)}

			{movie.countries && (
				<span>
					<b>Countries: </b>
					{movie.countries.map((country) => country.country).join(', ')}
				</span>
			)}

			{movie.genres && (
				<span>
					<b>Genres: </b>
					{movie.genres.map((genre) => genre.genre).join(', ')}
				</span>
			)}

			{movie.productionStatus && (
				<span>
					<b>Production Status: </b>
					{movie.productionStatus}
				</span>
			)}

			{movie.slogan && (
				<span>
					<b>Slogan: </b> {movie.slogan}
				</span>
			)}

			{movie.shortDescription && (
				<p style={{ fontStyle: 'italic' }}>{movie.shortDescription}</p>
			)}

			{/* <a
						className={styles.allSubsButton}
						href={movie.opensubtitles.all_url}
						rel='noopener noreferrer'
						target='_blank'
					>
						Check subtitles on OpenSubtitles
					</a> */}
		</div>
	</section>
)
