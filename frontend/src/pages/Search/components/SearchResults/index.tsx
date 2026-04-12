import type { HistoryMovie } from '@eni/shared'
import { useDispatch } from 'react-redux'

import { clearMoviesHistory } from '@/store'
import { DeleteButton } from '@/ui'

import { MovieCard } from '../MovieCard'

import styles from './SearchResults.module.scss'

interface SearchResultsProps {
	movies: HistoryMovie[]
	isHistory?: true
}

export const SearchResults = ({ movies, isHistory }: SearchResultsProps) => {
	const dispatch = useDispatch()

	return (
		<>
			<h2 className={styles.header}>
				{isHistory ? 'История поиска' : 'Результаты поиска'}
				{isHistory && (
					<DeleteButton onClick={() => dispatch(clearMoviesHistory())} />
				)}
			</h2>
			<ul className={styles.searchResultList}>
				{movies.map((movie) => (
					<MovieCard key={movie.filmId} isHistory={isHistory} movie={movie} />
				))}
			</ul>
		</>
	)
}
