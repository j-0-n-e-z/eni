import cn from 'classnames'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import type { KinopoiskMovie } from '@/types'
import { Container, Icons } from '@/ui'

import { MovieDetails } from './components/MovieDetails'
import { TranslateTitleButton } from './components/TranslateTitleButton'
import { IMDB_BASE_URL } from './constants'

import styles from './MovieInfo.module.scss'

interface MovieInfoProps {
	movie: KinopoiskMovie
}

const getMovieTitle = (movie: KinopoiskMovie, showOriginal: boolean) =>
	showOriginal
		? movie.nameOriginal || movie.nameRu
		: movie.nameRu || 'Отсутствует название на русском языке'

export const MovieInfo = ({ movie }: MovieInfoProps) => {
	const [showOriginalTitle, setShowOriginalTitle] = useState(true)
	const [isMovieInfoHidden, setIsMovieInfoHidden] = useState(false)
	const movieImdbLink = `${IMDB_BASE_URL}/${movie.imdbId}`
	const movieTitle = getMovieTitle(movie, showOriginalTitle)

	const toggleHideMovieInfo = () => {
		setIsMovieInfoHidden((c) => !c)
	}

	const toggleOriginalTitle = () => {
		setShowOriginalTitle((c) => !c)
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
							rel='noopener noreferrer'
							target='_blank'
							to={movieImdbLink}
						>
							{movieTitle}
						</Link>

						<TranslateTitleButton
							originalTitle={movie.nameOriginal}
							ruTitle={movie.nameRu}
							toggleTranslation={toggleOriginalTitle}
						/>
					</div>
				</Container>
			</h2>

			<div className={styles.toggleInfo}>
				<Container className={styles.heroContainer}>
					<Link target='_blank' to={movie.webUrl}>
						<div className={styles.cover}>
							<img
								alt={`${movie.nameOriginal ?? movie.nameRu ?? 'Movie'} Cover`}
								className={styles.coverImg}
								src={movie.posterUrl}
							/>
						</div>
					</Link>

					<div className={styles.movieInfoWrapper}>
						<h2 className={styles.titleWrapper}>
							<Link
								className={styles.titleLink}
								rel='noopener noreferrer'
								target='_blank'
								to={movieImdbLink}
							>
								{movieTitle}
							</Link>

							<TranslateTitleButton
								originalTitle={movie.nameOriginal}
								ruTitle={movie.nameRu}
								toggleTranslation={toggleOriginalTitle}
							/>
						</h2>

						<MovieDetails movie={movie} />
					</div>
				</Container>
			</div>

			<button
				aria-expanded={!isMovieInfoHidden}
				aria-label={`${isMovieInfoHidden ? 'show' : 'hide'} movie info`}
				className={styles.toggleMovieInfoBtn}
				onClick={toggleHideMovieInfo}
			>
				<Icons.Arrow />
			</button>
		</section>
	)
}
