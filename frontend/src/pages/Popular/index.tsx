import { useGetPopularWordsQuery } from '@/store/api'
import { Container, ErrorDisplay } from '@/ui'

import styles from './Popular.module.scss'
import { PopularWordsList } from './components/PopularWordsList'

export const Popular = () => {
	const {
		data: words,
		isFetching: isWordsFetching,
		error: wordsError
	} = useGetPopularWordsQuery()

	if (isWordsFetching) return <div>...Loading</div>

	if (wordsError) return <ErrorDisplay error={wordsError} />

	return (
		<section className={styles.popularWordsSection}>
			<Container>
				<h2 className={styles.popularWordsHeader}>Popular words</h2>
				<PopularWordsList words={words} />
			</Container>
		</section>
	)
}
