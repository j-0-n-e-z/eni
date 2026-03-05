export const TECHS = [
	{ icon: '⚛️', name: 'React' },
	{ icon: '🔷', name: 'TypeScript' },
	{ icon: '⚡', name: 'Vite' },
	{ icon: '🔀', name: 'React Router' },
	{ icon: '🎬', name: 'Framer Motion' },
	{ icon: '🍦', name: 'Swiper' },
	{ icon: '👒', name: 'SCSS' },
	{ icon: '📋', name: 'ESLint' },
	{ icon: '✨', name: 'Prettier' }
]

export const descriptionItemVariants = {
	hidden: { opacity: 0, y: 60 },
	visible: (custom: number) => ({
		opacity: 1,
		transition: {
			delay: 0.2 + custom * 0.3,
			duration: 0.5
		},
		y: 0
	})
}

export const apiItemVariants = {
	hidden: { opacity: 0, x: 300, y: 40 },
	visible: (custom: number) => ({
		opacity: 1,
		transition: {
			delay: 1.5 + custom * 0.3,
			duration: 0.35
		},
		x: 0,
		y: 0
	})
}
