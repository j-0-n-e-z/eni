import { useEffect, useRef, useState } from 'react'

export function useDebounce(value: string, delay: number) {
	const [debouncedValue, setDebouncedValue] = useState<string>(value)
	const debounceTimer = useRef<NodeJS.Timeout>(null)

	function cancelDebounce() {
		if (debounceTimer.current) {
			clearTimeout(debounceTimer.current)
		}
	}

	useEffect(() => {
		cancelDebounce()

		debounceTimer.current = setTimeout(() => {
			setDebouncedValue(value.trim())
		}, delay)

		return () => {
			cancelDebounce()
		}
	}, [value])

	return [debouncedValue, cancelDebounce] as const
}
