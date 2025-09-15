import type { FC } from 'react'
import { useEffect, useState } from 'react'
import { useOutletContext, useParams, useSearchParams } from 'react-router-dom'

import { EmptyState, ErrorDisplay, Paginator, Subtitle } from '@/components'
import { useDebounce } from '@/hooks'
import { EmptyIcon } from '@/icons'
import {
	useGetMeQuery,
	useGetSubtitleByFileIdQuery,
	useGetWordsByUserIdQuery
} from '@/store/api'
import { SUBTITLES_PER_PAGE } from '@/utils'

import type { MovieSubtitlesContext } from '../../types'

import styles from './Subtitles.module.scss'
import { SubtitlesSkeleton } from './SubtitlesSkeleton'

export const Subtitles: FC = () => {
	const { movieName, posterUrl } = useOutletContext<MovieSubtitlesContext>()
	const [searchParams, setSearchParams] = useSearchParams()
	const { movieId, fileId } = useParams()
	const [currentPage, setCurrentPage] = useState(1)
	const [searchedWord, setSearchedWord] = useState('')
	const [debouncedSearchedWord] = useDebounce(searchedWord, 500)
	const subtitlesStart = (currentPage - 1) * SUBTITLES_PER_PAGE

	const { data: me } = useGetMeQuery()
	const {
		data: subtitles,
		isLoading: isSubtitlesLoading,
		error: subtitlesError
	} = useGetSubtitleByFileIdQuery(Number(fileId), {
		skip: !fileId
	})

	const { data: words } = useGetWordsByUserIdQuery(me?.id || '', {
		skip: !me?.id
	})

	useEffect(() => {
		if (debouncedSearchedWord) {
			console.log(
				subtitles
					?.map((s) =>
						s.text.split(' ').map((w) => ({ text: w, timecode: s.timecode }))
					)
					.flat()
					.filter((x) => x.text === searchedWord)
			)
		}
	}, [debouncedSearchedWord])

	useEffect(() => {
		const page = parseInt(searchParams.get('page') || '1')
		setCurrentPage(page)
	}, [searchParams])

	const goToPage = (page: number) => {
		setCurrentPage(page)
		searchParams.delete('timecode')
		searchParams.set('page', page.toString())
		setSearchParams(searchParams)
	}

	if (isSubtitlesLoading) return <SubtitlesSkeleton />

	if (subtitlesError) return <ErrorDisplay error={subtitlesError} />

	if (!subtitles?.length)
		return (
			<EmptyState
				description='Субтитры не найдены'
				header='Пусто'
				icon={<EmptyIcon />}
			/>
		)

	return (
		<>
			<div className={styles.controlPanel}>
				<Paginator
					currentPage={currentPage}
					goToPage={goToPage}
					itemsLength={subtitles.length}
					itemsPerPage={SUBTITLES_PER_PAGE}
				/>
				<input
					type='text'
					value={searchedWord}
					onChange={(e) => setSearchedWord(e.target.value)}
				/>
			</div>
			<ul className={styles.subtitles}>
				{subtitles
					.slice(subtitlesStart, subtitlesStart + SUBTITLES_PER_PAGE)
					.map((subtitle) => (
						<Subtitle
							key={subtitle.timecode}
							myId={me?.id}
							subtitle={subtitle}
							savedWords={words?.filter((w) =>
								w.mySources.some(
									(s) => s.subtitleTimecode === subtitle.timecode
								)
							)}
							subtitleSource={{
								fileId: Number(fileId),
								movieId: Number(movieId),
								movieName,
								page: currentPage,
								posterUrl,
								sentence: subtitle.text,
								subtitleTimecode: subtitle.timecode
							}}
						/>
					))}
			</ul>
		</>
	)
}
