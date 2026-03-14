import cn from 'classnames'
import React from 'react'

type ButtonVariant = 'contained' | 'outlined' | 'text'

interface ButtonProps extends React.ComponentProps<'button'> {
	children: React.ReactNode
	loading?: boolean
	variant?: ButtonVariant
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ children, variant = 'contained', className, loading, ...props }, ref) => (
		<button
			className={cn('button', `button--${variant}`, className)}
			type='button'
			{...props}
			ref={ref}
		>
			{loading ? <span>...Loading</span> : children}
		</button>
	)
)
