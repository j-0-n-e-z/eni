export const USDFormatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	minimumFractionDigits: 0,
	maximumFractionDigits: 1
})

export const NumberFormatter = new Intl.NumberFormat('en-US')

export const DateFormatter = new Intl.DateTimeFormat('en-US', {
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

export function formatMoney(amount: number) {
	if (amount >= 1_000_000_000) {
		const billions = amount / 1_000_000_000
		return `${USDFormatter.format(billions)} billion`
	}

	if (amount >= 1_000_000) {
		const millions = amount / 1_000_000
		return `${USDFormatter.format(millions)} million`
	}

	return USDFormatter.format(amount)
}
