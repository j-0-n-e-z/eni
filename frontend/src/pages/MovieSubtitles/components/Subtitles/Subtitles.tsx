/* eslint-disable @typescript-eslint/no-use-before-define */
import { useEffect, useState } from 'react'
import { useOutletContext, useParams, useSearchParams } from 'react-router-dom'

import { SUBTITLES_PER_PAGE } from '@/constants'
import type { MovieSubtitlesContext } from '@/frontend-types'
import { useAuthData, useDebounce } from '@/hooks'
import {
	useGetSubtitlesByFileIdQuery,
	useGetWordsByUserIdQuery
} from '@/store/api'
import type { PureSubtitle } from '@/types'
import { EmptyState, ErrorDisplay, Icons, Skeleton } from '@/ui'
import { includesWord } from '@/utils'

import { Paginator } from './Paginator/Paginator'
import { Subtitle } from './Subtitle/Subtitle'
import { SubtitlesSkeleton } from './SubtitlesSkeleton'
import { useSavedWordsByTimecode } from './hooks'

import styles from './Subtitles.module.scss'

export const Subtitles = () => {
	const { movieName, posterUrl } = useOutletContext<MovieSubtitlesContext>()
	const { movieId, fileId } = useParams()
	const [searchParams, setSearchParams] = useSearchParams()
	const [currentPage, setCurrentPage] = useState(1)
	const [searchedWord, setSearchedWord] = useState('')
	const [isCaseSensitive, setIsCaseSensitive] = useState(false)
	const [isWholeMatch, setIsWholeMatch] = useState(false)
	const [isSearching, setIsSearching] = useState(false)
	const [debouncedSearchedWord] = useDebounce(searchedWord, 500)
	const subtitlesStart = (currentPage - 1) * SUBTITLES_PER_PAGE

	const { me } = useAuthData()
	const {
		data: subtitles,
		isLoading: isSubtitlesLoading,
		error: subtitlesError
	} = useGetSubtitlesByFileIdQuery(Number(fileId), {
		skip: !fileId
	})
	const { data: savedWords } = useGetWordsByUserIdQuery(me?.id || '', {
		skip: !me?.id
	})

	const savedWordsByTimecode = useSavedWordsByTimecode(savedWords)

	const [foundSubtitlesWithSearchedWord, setFoundSubtitlesWithSearchWord] =
		useState<(PureSubtitle & { page: number })[] | null>(null)

	useEffect(() => {
		let timeoutId: NodeJS.Timeout | null = null

		if (!debouncedSearchedWord) {
			setFoundSubtitlesWithSearchWord(null)
			setIsSearching(false)
			return
		}

		if (debouncedSearchedWord && subtitles) {
			setIsSearching(true)

			searchWord()
			// timeout чтобы setIsSearching попали в разные рендеры
			timeoutId = setTimeout(() => {
				setIsSearching(false)
			}, 300)
		}

		return () => {
			if (timeoutId) clearTimeout(timeoutId)
		}
	}, [debouncedSearchedWord, isCaseSensitive, isWholeMatch])

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

	const searchWord = () => {
		if (!subtitles) return

		const subtitlesWithPages = subtitles.map((subtitle, i) => ({
			...subtitle,
			page: Math.ceil((i + 1) / SUBTITLES_PER_PAGE)
		}))

		const filteredSubtitles = subtitlesWithPages.filter((subtitle) =>
			includesWord(
				subtitle.text,
				debouncedSearchedWord,
				isCaseSensitive,
				isWholeMatch
			)
		)
		setFoundSubtitlesWithSearchWord(filteredSubtitles)
	}

	const getSubtitleSource = (
		subtitleTimecode: string,
		subtitleText: string,
		page?: number
	) => ({
		fileId: Number(fileId),
		movieId: Number(movieId),
		movieName,
		page: page ?? currentPage,
		posterUrl,
		sentence: subtitleText,
		subtitleTimecode
	})

	function renderSubtitles() {
		if (isSubtitlesLoading) return <SubtitlesSkeleton />

		if (subtitlesError) return <ErrorDisplay error={subtitlesError} />

		if (!subtitles?.length)
			return (
				<EmptyState
					description='Субтитры не найдены'
					header='Пусто'
					icon={<Icons.Empty />}
				/>
			)

		if (isSearching)
			return (
				<div className={styles.subtitles}>
					<Skeleton height='3rem' />
					<Skeleton height='3rem' />
					<Skeleton height='3rem' />
					<Skeleton height='3rem' />
					<Skeleton height='3rem' />
				</div>
			)

		if (!debouncedSearchedWord || !foundSubtitlesWithSearchedWord)
			return (
				<ul className={styles.subtitles}>
					{subtitles
						.slice(subtitlesStart, subtitlesStart + SUBTITLES_PER_PAGE)
						.map((subtitle) => (
							<Subtitle
								key={subtitle.timecode}
								myId={me?.id}
								savedWords={savedWordsByTimecode.get(subtitle.timecode)}
								subtitle={subtitle}
								subtitleSource={getSubtitleSource(
									subtitle.timecode,
									subtitle.text
								)}
							/>
						))}
				</ul>
			)

		if (foundSubtitlesWithSearchedWord.length === 0)
			return (
				<EmptyState
					description={`Слово "${debouncedSearchedWord}" не найдено`}
					header='Не найдено'
					icon={<Icons.Search />}
				/>
			)

		if (foundSubtitlesWithSearchedWord.length > 0)
			return (
				<ul className={styles.subtitles}>
					{foundSubtitlesWithSearchedWord.map((subtitle) => (
						<Subtitle
							key={subtitle.timecode}
							myId={me?.id}
							savedWords={savedWordsByTimecode.get(subtitle.timecode)}
							subtitle={subtitle}
							subtitleSource={getSubtitleSource(
								subtitle.timecode,
								subtitle.text,
								subtitle.page
							)}
						/>
					))}
				</ul>
			)
	}

	return (
		<>
			{subtitles && (
				<div className={styles.controlPanel}>
					<Paginator
						currentPage={currentPage}
						goToPage={goToPage}
						isDisabled={Boolean(debouncedSearchedWord)}
						itemsLength={subtitles.length}
						itemsPerPage={SUBTITLES_PER_PAGE}
					/>
					<div className={styles.findWord}>
						<input
							aria-label='find word'
							className={styles.findWordInput}
							id='findWord'
							placeholder='Find word'
							type='text'
							value={searchedWord}
							onChange={(e) => setSearchedWord(e.target.value)}
						/>
						<div className={styles.findWordControlsContainer}>
							<label
								aria-label='case sensitive'
								className={styles.findWordControl}
								htmlFor='caseSensitive'
							>
								<input
									checked={isCaseSensitive}
									id='caseSensitive'
									type='checkbox'
									onChange={() => setIsCaseSensitive((p) => !p)}
								/>
								<Icons.CaseSensitive />
							</label>
							<label
								aria-label='whole word'
								className={styles.findWordControl}
								htmlFor='wholeWord'
							>
								<input
									checked={isWholeMatch}
									id='wholeWord'
									type='checkbox'
									onChange={() => setIsWholeMatch((p) => !p)}
								/>
								<Icons.WholeWord />
							</label>
						</div>
					</div>
				</div>
			)}
			{renderSubtitles()}
		</>
	)
}
