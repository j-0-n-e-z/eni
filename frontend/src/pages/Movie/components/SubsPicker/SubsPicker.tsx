import { useOutletContext } from 'react-router-dom'

import type { MovieContext } from '@/frontend-types'
import { useGetSubtitleReleasesQuery } from '@/store/api'
import { Container, EmptyState, ErrorDisplay, Icons } from '@/ui'

import { SubtitleRelease } from './components/SubtitleRelease/SubtitleRelease'
import { SubsPickerSkeleton } from './SubsPickerSkeleton'

import styles from './SubsPicker.module.scss'

export const SubsPicker = () => {
	const { imdbId, title } = useOutletContext<MovieContext>()
	const query = imdbId || title
	const {
		data: subtitleReleases,
		error: subtitleReleasesError,
		isFetching: isSubtitleReleasesFetching
	} = useGetSubtitleReleasesQuery(query || '', {
		skip: !query
	})

	if (isSubtitleReleasesFetching) return <SubsPickerSkeleton />

	if (subtitleReleasesError)
		return <ErrorDisplay error={subtitleReleasesError} />

	if (!subtitleReleases?.length)
		return (
			<EmptyState
				description='Варианты субтитров не найдены'
				header='Не найдено'
				icon={<Icons.Subtitle />}
			/>
		)

	return (
		<Container className={styles.subsPicker}>
			<h3 className={styles.subsHeader}>Выберите субтитры</h3>
			<ul className={styles.subList}>
				{subtitleReleases.map((subtitleRelease) => (
					<SubtitleRelease
						key={subtitleRelease.id}
						subtitleRelease={subtitleRelease}
					/>
				))}
			</ul>
		</Container>
	)
}
