import { useEffect, useState } from 'react'

/**
 * Хук useDebounce.
 * @param value - Значение, которое нужно "отложить".
 * @param delay - Задержка в миллисекундах.
 * @returns Отложенное значение.
 */
function useDebounce<T>(value: T, delay: number): T {
	const [debouncedValue, setDebouncedValue] = useState<T>(value)

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedValue(value)
		}, delay)

		return () => {
			clearTimeout(timer)
		}
	}, [value])

	return debouncedValue
}

export default useDebounce
