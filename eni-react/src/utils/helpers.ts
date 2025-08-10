export const USDFormatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	maximumFractionDigits: 0
})

export const USDateFormatter = new Intl.DateTimeFormat('en-US', {
	month: 'long',
	day: 'numeric',
	year: 'numeric'
})

export const formatToOneDecimal = (num: number) => {
	const rounded = num.toFixed(1)
	return rounded.at(-1) === '0' ? rounded.slice(0, -2) : rounded
}

export const formatMinutesToHours = (totalMinutes: number) => {
	const hours = Math.trunc(totalMinutes / 60)
	const minutes = totalMinutes % 60

	if (!hours) return `${minutes}m`

	return `${hours}h ${minutes}m`
}
