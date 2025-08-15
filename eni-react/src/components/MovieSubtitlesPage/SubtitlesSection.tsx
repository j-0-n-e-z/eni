import { useEffect, useState, type FC } from 'react'
import toast from 'react-hot-toast'

import { useLazyGetSubtitleByFileIdQuery } from '@/api'
import type { MovieSubtitle, Word } from '@/types'

import { MovieSubtitlesPicker } from '../MovieSubtitlesPicker/MovieSubtitlesPicker'
import { Subtitles } from '../Subtitles/Subtitles'

interface SubtitlesSectionProps {
	isMovieSubtitlesLoading: boolean
	movieSubtitles?: MovieSubtitle[]
	lookupWord: Word | undefined
}

export const SubtitlesSection: FC<SubtitlesSectionProps> = ({
	isMovieSubtitlesLoading,
	movieSubtitles,
	lookupWord
}) => {
	const [pickedMovieSubtitles, setPickedMovieSubtitles] =
		useState<MovieSubtitle | null>(null)

	const [
		triggerGetSubtilesByFileId,
		{ data: subtitles, isLoading: isSubtitlesLoading, error: subtitlesError }
	] = useLazyGetSubtitleByFileIdQuery()

	useEffect(() => {
		if (subtitlesError)
			toast.error('Faild to load subtitles', { id: 'subtitles' })
	}, [subtitlesError])

	useEffect(() => {
		if (pickedMovieSubtitles)
			triggerGetSubtilesByFileId(pickedMovieSubtitles.subtitles.file_id)
	}, [pickedMovieSubtitles])

	useEffect(() => {
		if (lookupWord) {
			triggerGetSubtilesByFileId(lookupWord.from.fileId)
		}
	}, [])

	if (lookupWord && subtitles) {
		return (
			<section>
				<Subtitles
					fileId={lookupWord.from.fileId}
					lookupWord={lookupWord}
					subtitles={subtitles}
				/>
			</section>
		)
	}

	return (
		<section>
			{isMovieSubtitlesLoading && <div>...Загрузка вариантов субтитров</div>}
			{!isMovieSubtitlesLoading && movieSubtitles?.length === 0 && (
				<div>Не удалось загрузить варианты субтитров</div>
			)}

			{!pickedMovieSubtitles && movieSubtitles && (
				<MovieSubtitlesPicker
					movieSubtitles={movieSubtitles}
					pickMovieSubtitle={setPickedMovieSubtitles}
				/>
			)}

			{isSubtitlesLoading && <div>...Загрузка субтитров</div>}
			{pickedMovieSubtitles &&
				!isSubtitlesLoading &&
				subtitles?.length === 0 && <div>Не удалось загрузить субтитры</div>}
			{pickedMovieSubtitles && subtitles && subtitles.length !== 0 && (
				<Subtitles
					fileId={pickedMovieSubtitles.subtitles.file_id}
					subtitles={subtitles}
				/>
			)}
		</section>
	)
}
