import { useCallback } from 'react'

import { useLazyTranslateQuery } from '@/store/api'
import { notifyOnError } from '@/utils'

export const useTranslate = () => {
	const [triggerSubtitleTranslate, { data, error, isFetching }] =
		useLazyTranslateQuery()

	const translate = useCallback(async (text: string) => {
		try {
			await triggerSubtitleTranslate(text).unwrap()
		} catch (e) {
			notifyOnError('Произошла ошибка при переводе', 'translateError')
		}
	}, [])

	return {
		isTranslationFetching: isFetching,
		translate,
		translation: data?.[0].text,
		translationError: error
	}
}
