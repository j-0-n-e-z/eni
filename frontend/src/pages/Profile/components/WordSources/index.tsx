import cn from 'classnames'
import Skeleton from 'react-loading-skeleton'
import { useNavigate } from 'react-router-dom'

import type { BackendError } from '@/frontend-types'
import {
	useDeleteWordSourceMutation,
	useLazyGetMoreWordSourcesQuery
} from '@/store/api'
import type { SavedWord, WordSource } from '@/types'
import { ErrorDisplay, Icons } from '@/ui'
import { notifyOnError } from '@/utils'

import styles from './WordSources.module.scss'

interface WordSourcesProps {
	myId: string | undefined
	isMyProfile: boolean
	word: SavedWord
	userSources: WordSource[]
}

export const WordSources = ({
	word,
	userSources,
	myId,
	isMyProfile
}: WordSourcesProps) => {
	const navigate = useNavigate()
	const [
		triggerGetMoreWordSources,
		{
			data: moreSources,
			isFetching: isMoreSourcesFetching,
			error: moreSourcesError
		}
	] = useLazyGetMoreWordSourcesQuery()
	const [triggerDeleteWordSource, { isLoading: isDeleteWordSourceFetching }] =
		useDeleteWordSourceMutation()

	// TODO: refactor WordSources

	async function deleteWordSource(wordSource: WordSource) {
		try {
			if (!isDeleteWordSourceFetching && isMyProfile && myId) {
				await triggerDeleteWordSource({
					userId: myId,
					wordSource,
					wordText: word.text
				}).unwrap()
			}
		} catch (e) {
			const error = e as BackendError
			notifyOnError(
				error.data?.error.message ?? 'Произошла ошибка при удалении слова',
				`deleteWordSource${wordSource.id}`
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
			<ul className={styles.wordSourceList}>
				{sources.map((source) => (
					<li
						key={source.id}
						className={cn(styles.wordSource, {
							[styles.mySource]: isMySources
						})}
					>
						<button
							className={styles.sourceHero}
							onClick={() => goToWord(source)}
						>
							<img
								alt='poster'
								className={styles.poster}
								src={source.posterUrl}
							/>
							<div className={styles.sourceInfo}>
								<h3 className={styles.movieName}>{source.movieName}</h3>
								<p className={styles.sentence}>{source.sentence}</p>
							</div>
						</button>
						{isMySources && (
							<button
								aria-label='delete my word source'
								className={styles.deleteMySourceBtn}
								onClick={() => deleteWordSource(source)}
							>
								<Icons.TrashIcon />
							</button>
						)}
					</li>
				))}
			</ul>
		)
	}

	function renderMoreSources() {
		if (isMoreSourcesFetching)
			return <Skeleton containerClassName='flex1 center' width='50%' />

		if (!moreSources)
			return (
				<button
					className={styles.loadMoreBtn}
					onClick={() => triggerGetMoreWordSources(word.text)}
				>
					Load additional sources
				</button>
			)

		if (moreSourcesError) return <ErrorDisplay error={moreSourcesError} />

		const moreSourcesWithoutMySources = moreSources.filter(
			(source) => !userSources.find((s) => s.id === source.id)
		)

		if (moreSourcesWithoutMySources.length === 0)
			return (
				<p className={styles.noAdditionalSourcesMsg}>
					No additional sources found
				</p>
			)

		return renderSourceList(moreSourcesWithoutMySources)
	}

	return (
		<>
			<h3 className={styles.wordSourcesHeader}>
				Sources for word &quot;{word.text}&quot;
			</h3>
			<div className={styles.wordSourcesContainer}>
				{renderSourceList(userSources, true)}

				<div className={styles.additionalSources}>{renderMoreSources()}</div>
			</div>
		</>
	)
}
