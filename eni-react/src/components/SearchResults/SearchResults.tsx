import type { FC } from 'react'
import { Link } from 'react-router-dom'

import type { Movie } from '@/types'

import styles from './SearchResults.module.scss'

interface SearchResultsProps {
	movies: Movie[]
}

export const SearchResults: FC<SearchResultsProps> = ({ movies }) => (
	<ul className={styles.searchResults}>
		{movies.map(({ id, img_url, title, release_year, subtitles }) => (
			<li key={id}>
				<Link className={styles.movieCard} to={`/movie/${id}`}>
					<img alt={`${title} Cover`} className={styles.cover} src={img_url} />
					<div className={styles.details}>
						<h3 className={styles.title}>{title}</h3>
						<span className={styles.year}>{release_year}</span>
						<span className={styles.rating}>
							Subtitles rating: ⭐ {subtitles.rating}
						</span>
					</div>
				</Link>
			</li>
		))}
	</ul>
)
