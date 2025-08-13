import type { FC } from 'react'
import { Link } from 'react-router-dom'

import type { KinopoiskSearchMovie } from '@/types'

import styles from './SearchResults.module.scss'

interface SearchResultsProps {
	movies: KinopoiskSearchMovie[]
}

export const SearchResults: FC<SearchResultsProps> = ({ movies }) => (
	<ul className={styles.searchResults}>
		{movies.map(({ filmId, posterUrlPreview, nameEn, year }) => (
			<li key={filmId}>
				<Link className={styles.movieCard} to={`/movie/${filmId}`}>
					<img
						alt={`${nameEn} Cover`}
						className={styles.cover}
						src={posterUrlPreview}
					/>
					<div className={styles.details}>
						<h3 className={styles.title}>{nameEn}</h3>
						<span className={styles.year}>{year}</span>
					</div>
				</Link>
			</li>
		))}
	</ul>
)
