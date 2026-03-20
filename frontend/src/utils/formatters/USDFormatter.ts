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
