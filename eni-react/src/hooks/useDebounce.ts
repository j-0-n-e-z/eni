import { useEffect, useRef, useState } from 'react'

export function useDebounce<T>(value: T, delay: number) {
	const [debouncedValue, setDebouncedValue] = useState<T>(value)
	const debounceTimer = useRef<NodeJS.Timeout>(null)

	function cancelDebounce() {
		if (debounceTimer.current) {
			clearTimeout(debounceTimer.current)
		}
	}

	useEffect(() => {
		cancelDebounce()

		debounceTimer.current = setTimeout(() => {
			setDebouncedValue(value)
		}, delay)

		return () => {
			cancelDebounce()
		}
	}, [value])

	return [debouncedValue, cancelDebounce] as const
}
