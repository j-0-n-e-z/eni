import { useCallback, useEffect, useRef, useState } from 'react'

export function useDebounce(value: string, delay: number) {
	const [debouncedValue, setDebouncedValue] = useState<string>(value)
	const debounceTimer = useRef<NodeJS.Timeout | null>(null)

	const cancelDebounce = useCallback(() => {
		if (debounceTimer.current) {
			clearTimeout(debounceTimer.current)
			debounceTimer.current = null
		}
	}, [])

	useEffect(() => {
		cancelDebounce()

		const trimmedValue = value.trim()
		debounceTimer.current = setTimeout(() => {
			setDebouncedValue(trimmedValue)
		}, delay)

		return cancelDebounce
	}, [value, delay, cancelDebounce])

	return [debouncedValue, cancelDebounce] as const
}
