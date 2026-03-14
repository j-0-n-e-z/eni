export const getFadeInVariants = (
	delay: number = 0.2,
	duration: number = 0.5
) => ({
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			delay,
			duration
		}
	}
})

export const fadeInAndUp = {
	hidden: { opacity: 0, y: 60 },
	visible: (custom: number = 0) => ({
		opacity: 1,
		transition: {
			delay: 0.3 + custom * 0.3,
			duration: 0.4
		},
		y: 0
	})
}
