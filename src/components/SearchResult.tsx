import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { getSubtitles } from '../getSubtitles'
import { Attribute, Movie, Subtitle } from '../types'

interface SearchResultProps {
	movie: Movie
	setSubtitles: Dispatch<SetStateAction<Subtitle[] | null>>
}

export const SearchResult: FC<SearchResultProps> = ({
	movie: { attributes },
	setSubtitles
}) => {
	const [error, setError] = useState<Error | null>(null)

	const coverImg = attributes.related_links[0].img_url
	const movieTitle = attributes.feature_details.title

	async function onSearchResultClick(attributes: Attribute) {
		try {
			const subtitles = await getSubtitles(attributes.files[0].file_id)
			console.log(subtitles)
			setSubtitles(subtitles)
		} catch (e) {
			setError(e as Error)
		}
	}

	return (
		<li
			className='search-result'
			onClick={() => onSearchResultClick(attributes)}
		>
			<img className='cover' src={coverImg} alt={movieTitle + ' Cover'} />
			<div>
				<div>{movieTitle}</div>
				<div>{attributes.files[0].file_id}</div>
				{error && <div>{error.message}</div>}
			</div>
		</li>
	)
}
