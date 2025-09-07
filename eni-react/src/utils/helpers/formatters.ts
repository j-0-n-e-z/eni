export const USDFormatter = new Intl.NumberFormat('en-US', {
	currency: 'USD',
	maximumFractionDigits: 1,
	minimumFractionDigits: 0,
	style: 'currency'
})

export const NumberFormatter = new Intl.NumberFormat('en-US')

export const DateFormatter = new Intl.DateTimeFormat('en-US', {
	day: 'numeric',
	month: 'short',
	year: 'numeric'
})

export const formatMinutesToHours = (totalMinutes: number) => {
	const hours = Math.trunc(totalMinutes / 60)
	const minutes = totalMinutes % 60

	if (!hours) return `${minutes}m`

	return `${hours}h ${minutes}m`
}

export function formatMoney(amount: number, currency: string) {
	const USDFormatter = new Intl.NumberFormat('en-US', {
		currency,
		maximumFractionDigits: 1,
		minimumFractionDigits: 0,
		style: 'currency'
	})

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

export function formatRating(mpaaRating: string) {
	return mpaaRating.toUpperCase().replace(/([A-Z])(\d)/, '$1-$2')
}
