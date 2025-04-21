import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { getCompactMovieInfo } from '../../../utils/helpers/getDisplayMovieInfo'
import { Movie as IMovie } from '../../../types'
import styles from './SearchResults.module.scss'

interface SearchResultsProps {
	movies: IMovie[]
}

const SearchResults: FC<SearchResultsProps> = ({ movies }) => {
	return (
		<ul className={styles.searchResults}>
			{movies.map((movie) => {
				const { coverImg, rating, title, year, id } = getCompactMovieInfo(movie)
				return (
					<li key={id}>
						<Link className={styles.movieCard} to={`/subtitles/${id}`}>
							<img
								className={styles.cover}
								src={coverImg}
								alt={title + ' Cover'}
							/>
							<div className={styles.details}>
								<h3 className={styles.title}>{title}</h3>
								<span className={styles.year}>{year}</span>
								<span className={styles.rating}>⭐{rating}</span>
							</div>
						</Link>
					</li>
				)
			})}
		</ul>
	)
}

export default SearchResults
