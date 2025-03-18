import React, { FC } from 'react'
import { getSubtitleLink } from '../getSubtitleLink'
import { Subtitle } from '../types'

interface SearchResultProps {
	subtitle: Subtitle
}

export const SearchResult: FC<SearchResultProps> = ({ subtitle }) => {
	const coverImg = subtitle.attributes.related_links[0].img_url
	const movieTitle = subtitle.attributes.feature_details.title

	async function onSearchResultClick(subtitle: Subtitle) {
		getSubtitleLink(subtitle.attributes.files[0].file_id)
	}

	return (
		<li className='search-result' onClick={() => onSearchResultClick(subtitle)}>
			<img className='cover' src={coverImg} alt={movieTitle + ' Cover'} />
			<div>
				<div>{movieTitle}</div>
				<div>{subtitle.attributes.files[0].file_id}</div>
			</div>
		</li>
	)
}
