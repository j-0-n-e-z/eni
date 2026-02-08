import { useCallback, useEffect, useRef, useState } from 'react'

export function useDebounce<T>(value: T, delay: number) {
	const [debouncedValue, setDebouncedValue] = useState<T>(value)
	const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

	const cancelDebounce = useCallback(() => {
		if (debounceTimer.current) {
			clearTimeout(debounceTimer.current)
			debounceTimer.current = null
		}
	}, [])

	useEffect(() => {
		cancelDebounce()

		debounceTimer.current = setTimeout(() => {
			setDebouncedValue(value)
		}, delay)

		return cancelDebounce
	}, [value, delay])

	return [debouncedValue, cancelDebounce] as const
}
