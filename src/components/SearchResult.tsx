import React, { FC } from 'react'
import { getSubtitles } from '../getSubtitles'
import { Movie } from '../types'

interface SearchResultProps {
	movie: Movie
}

export const SearchResult: FC<SearchResultProps> = ({ movie }) => {
	const coverImg = movie.attributes.related_links[0].img_url
	const movieTitle = movie.attributes.feature_details.title

	async function onSearchResultClick(movie: Movie) {
		getSubtitles(movie.attributes.files[0].file_id)
	}

	return (
		<li className='search-result' onClick={() => onSearchResultClick(movie)}>
			<img className='cover' src={coverImg} alt={movieTitle + ' Cover'} />
			<div>
				<div>{movieTitle}</div>
				<div>{movie.attributes.files[0].file_id}</div>
			</div>
		</li>
	)
}
