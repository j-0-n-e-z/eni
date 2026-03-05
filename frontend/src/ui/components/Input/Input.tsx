import cn from 'classnames'
import type { JSX } from 'react'
import React from 'react'

import styles from './Input.module.scss'

type InputProps<
	Component extends
		| React.JSXElementConstructor<unknown>
		| keyof JSX.IntrinsicElements = 'input'
> = {
	label?: string
	error?: string
	component?: Component
} & React.ComponentProps<Component>

export const Input = React.forwardRef(
	(
		{
			label,
			className,
			component,
			error,
			id: externalId,
			...props
		}: InputProps<'input'>,
		ref: React.ForwardedRef<HTMLInputElement>
	) => {
		const internalId = React.useId()
		const id = externalId ?? internalId
		const Component = component ?? 'input'

		return (
			<div className={cn(styles.container, { [styles.error]: !!error })}>
				{label && (
					<label className={styles.label} htmlFor={id}>
						{label}
						{error && <span className={styles.errorText}>{error}</span>}
					</label>
				)}
				<Component
					className={cn(styles.input, className)}
					{...props}
					ref={ref}
					id={id}
				/>
			</div>
		)
	}
) as <
	Component extends
		| React.JSXElementConstructor<unknown>
		| keyof JSX.IntrinsicElements = 'input'
>(
	props: InputProps<Component> & { ref?: React.ForwardedRef<HTMLInputElement> }
) => React.ReactElement
