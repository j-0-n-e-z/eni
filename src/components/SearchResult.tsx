import React, { FC } from 'react'
import { Subtitle } from '../types'

interface SearchResultProps {
	subtitle: Subtitle
}

export const SearchResult: FC<SearchResultProps> = ({ subtitle }) => {
	return (
		<li className='search-result'>
			<img
				className='cover'
				src={subtitle.attributes.related_links[0].img_url}
				alt={subtitle.attributes.feature_details.title + ' Cover'}
			/>
			<div>
        <div>{subtitle.attributes.feature_details.title}</div>
        <div>{subtitle.attributes.related_links[0].url}</div>
        <div>{subtitle.attributes.files[0].file_id}</div>
			</div>
		</li>
	)
}
