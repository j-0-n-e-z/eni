import cn from 'classnames'
import type { FC } from 'react'
import toast from 'react-hot-toast'
import Skeleton from 'react-loading-skeleton'
import { useNavigate } from 'react-router-dom'

import { ErrorDisplay } from '@/components'
import { TrashIcon } from '@/icons'
import type { BackendError } from '@/store/api'
import {
	useDeleteWordSourceMutation,
	useLazyGetMoreWordSourcesQuery
} from '@/store/api'
import type { Word, WordSource } from '@/types'

import s from './Word.module.scss'

interface WordSourcesProps {
	myId?: string
	word: Word
	mySources: WordSource[]
}

export const WordSources: FC<WordSourcesProps> = ({
	word,
	mySources,
	myId
}) => {
	const navigate = useNavigate()
	const [
		triggerGetMoreWordSources,
		{
			data: moreSources,
			isFetching: isMoreSourcesFetching,
			error: moreSourcesError
		}
	] = useLazyGetMoreWordSourcesQuery()
	const [
		triggerDeleteWordSource,
		{ isFetching: isDeleteWordSourceFetching, error: deleteWordSourceError }
	] = useDeleteWordSourceMutation()

	async function deleteWordSource(wordSource: WordSource) {
		try {
			if (!isDeleteWordSourceFetching && myId) {
				await triggerDeleteWordSource({
					userId: myId,
					wordSource,
					wordText: word.text
				}).unwrap()
			}
		} catch (e) {
			const error = e as BackendError
			toast.error(
				error.data?.error.message ?? 'Произошла ошибка при удалении слова',
				{
					id: `deleteWordSource${wordSource.id}`
				}
			)
		}
	}

	function goToWord({ movieId, fileId, page, subtitleTimecode }: WordSource) {
		navigate(
			`/movie/${movieId}/subtitles/${fileId}?page=${page}&timecode=${subtitleTimecode}`,
			{
				state: { lookupWord: word }
			}
		)
	}

	function renderSourceList(
		sources: WordSource[],
		isMySources: boolean = false
	) {
		return (
			<ul className={s.wordSourceList}>
				{sources.map((source) => (
					<li
						key={source.id}
						className={cn(s.wordSource, { [s.mySource]: isMySources })}
					>
						<div className={s.sourceHero} onClick={() => goToWord(source)}>
							<img alt='poster' className={s.poster} src={source.posterUrl} />
							<div className={s.sourceInfo}>
								<div className={s.movieName}>{source.movieName}</div>
								<div className={s.timecode}>{source.subtitleTimecode}</div>
								<p>{source.sentence}</p>
							</div>
						</div>
						{myId && (
							<button
								aria-label='delete word source'
								onClick={() => deleteWordSource(source)}
							>
								<TrashIcon />
							</button>
						)}
					</li>
				))}
			</ul>
		)
	}

	function renderMoreSources() {
		if (isMoreSourcesFetching) return <Skeleton />

		if (moreSourcesError) return <ErrorDisplay error={moreSourcesError} />

		if (moreSources) {
			const moreSourcesWithoutMySources = moreSources.filter(
				(source) => !mySources.find((s) => s.id === source.id)
			)

			if (moreSourcesWithoutMySources.length === 0)
				return <p>No additional sources found</p>

			return renderSourceList(moreSourcesWithoutMySources)
		}

		return null
	}

	return (
		<div className={s.wordSourcesContainer}>
			<h3 className={s.wordSourcesHeader}>
				Sources for word &quot;{word.text}&quot;
			</h3>

			{renderSourceList(mySources, true)}

			{renderMoreSources()}

			{!moreSources && (
				<button
					className={s.loadMoreBtn}
					onClick={() => triggerGetMoreWordSources(word.text)}
				>
					Load additional sources
				</button>
			)}
		</div>
	)
}
