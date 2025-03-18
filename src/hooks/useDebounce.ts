import { useEffect, useRef, useState } from 'react'

/**
 * Хук useDebounce.
 * @param value - Значение, которое нужно "отложить".
 * @param delay - Задержка в миллисекундах.
 * @returns Отложенное значение.
 */
function useDebounce<T>(value: T, delay: number) {
	const [debouncedValue, setDebouncedValue] = useState<T>(value)
	const debounceTimer = useRef<NodeJS.Timeout>(undefined)

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

export default useDebounce
