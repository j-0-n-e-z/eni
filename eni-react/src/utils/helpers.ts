export const USDFormatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	maximumFractionDigits: 0
})

export const NumberFormatter = new Intl.NumberFormat('en-US')

export const MillionsFormatter = new Intl.NumberFormat('en-US', {
	
})

export const USDateFormatter = new Intl.DateTimeFormat('en-US', {
	month: 'short',
	day: 'numeric',
	year: 'numeric'
})

export const formatMinutesToHours = (totalMinutes: number) => {
	const hours = Math.trunc(totalMinutes / 60)
	const minutes = totalMinutes % 60

	if (!hours) return `${minutes}m`

	return `${hours}h ${minutes}m`
}
