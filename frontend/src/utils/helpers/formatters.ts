export const originalUSDFormatter = new Intl.NumberFormat('en-US', {
	currency: 'USD',
	maximumFractionDigits: 1,
	minimumFractionDigits: 0,
	style: 'currency'
})

export const USDFormatter = {
	format(amount: number, fallback: string = '$0') {
		if (!Number.isFinite(amount)) return fallback
		return originalUSDFormatter.format(amount)
	}
}

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

	if (!minutes) return `${hours}h`

	return `${hours}h ${minutes}m`
}

export const formatDurationStrToHours = (duration: string) => {
	const [hours, minutes] = duration.split(':').map(Number)
	return formatMinutesToHours(hours * 60 + minutes)
}

export function formatMoney(amount: number, currency: string) {
	let currencyFormatter:
		| Intl.NumberFormat
		| { format: (amount: number) => string }

	try {
		currencyFormatter = new Intl.NumberFormat('en-US', {
			currency,
			currencyDisplay: 'symbol',
			maximumFractionDigits: 1,
			minimumFractionDigits: 0,
			style: 'currency'
		})
	} catch {
		currencyFormatter = {
			format: (amount: number) =>
				`${currency} ${NumberFormatter.format(amount)}`
		}
	}

	if (amount >= 1_000_000_000) {
		const billions = +(amount / 1_000_000_000).toFixed(2)
		return `${currencyFormatter.format(billions)} billion`
	}

	if (amount >= 1_000_000) {
		const millions = +(amount / 1_000_000).toFixed(2)
		return `${currencyFormatter.format(millions)} million`
	}

	return currencyFormatter.format(amount).replace(String.fromCharCode(160), ' ')
}

export function formatRating(mpaaRating: string) {
	return mpaaRating.toUpperCase().replace(/([A-Z])(\d)/, '$1-$2')
}

export function formatAgeLimit(ageLimit: string) {
	const ageNumbers = ageLimit.match(/\d+/)

	if (ageNumbers) {
		return `${ageNumbers[0]}+`
	}

	return '0+'
}
