import React, { HTMLAttributes, JSX } from "react";
import useRipple from "../../utils/useRipple";

interface FilledButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	size?: "xs" | "s" | "m" | "l" | "xl";
	shape?: "round" | "square";
	children?: React.ReactNode;
	ripple?: boolean;
}

const FilledButton = ({
	children,
	size = "s",
	shape = "round",
	className,
	ripple = true,
	...rest
}: FilledButtonProps) => {
	let sizeClasses = "text-sm leading-5 h-10 px-4";
	let shapeClasses = shape === "round" ? "rounded-full" : "rounded-xl";

	if (size === "m") {
		sizeClasses = "text-base leading-6 h-14 px-6";
		shapeClasses = shape === "round" ? "rounded-full" : "rounded-2xl";
	}

	const { onMouseDown, onTouchStart } = useRipple({ ripple });

	return (
		<button
			className={`bg-primary dark:bg-dark-primary text-on-primary dark:text-dark-on-primary duration-150 select-none
				flex items-center justify-center relative overflow-hidden
				${sizeClasses} ${shapeClasses} ${className}`}
			{...rest}
			onMouseDown={onMouseDown}
			onTouchStart={onTouchStart}
		>
			<div className="absolute w-full h-full hover:bg-on-surface-variant/10"></div>
			{children}
		</button>
	);
};

interface TextButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	size?: "xs" | "s" | "m" | "l" | "xl";
	shape?: "round" | "square";
	children?: React.ReactNode;
	ripple?: boolean;
	ref?: React.Ref<HTMLButtonElement>;
}

const TextButton: React.FC<HTMLAttributes<HTMLButtonElement>> = ({
	children,
	size = "s",
	shape = "round",
	className = "",
	disabled,
	ref,
	ripple = true,
	...rest
}: TextButtonProps) => {
	let sizeClasses = "text-sm leading-5 h-10 px-4";
	let shapeClasses = "rounded-full";

	if (size === "m") {
		sizeClasses = "text-base leading-6 h-14 px-6";
		shapeClasses = shape === "round" ? "rounded-full" : "rounded-2xl";
	}

	const { onMouseDown, onTouchStart } = useRipple({ ripple });

	return (
		<button
			className={`text-primary dark:text-dark-primary duration-150 select-none
				flex items-center justify-center relative overflow-hidden
				disabled:text-on-surface/40 disabled:dark:text-dark-on-surface/40
				${sizeClasses} ${shapeClasses} ${className}`}
			{...rest}
			onMouseDown={onMouseDown}
			onTouchStart={onTouchStart}
			disabled={disabled}
			ref={ref}
		>
			<div
				className={`absolute w-full h-full enabled:hover:bg-primary/10 enabled:dark:hover:bg-dark-primary/10
				${disabled && "bg-on-surface/10 dark:bg-dark-on-surface/10"}
				left-0 top-0`}
			></div>
			{children}
		</button>
	);
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children?: React.ReactNode;
	variant?: "text" | "filled";
}

export const Button: React.FC<HTMLAttributes<HTMLButtonElement>> = ({
	children,
	variant,
	...rest
}: ButtonProps): JSX.Element => {
	switch (variant) {
		case "text":
			return <TextButton {...rest}>{children}</TextButton>;
		case "filled":
			return <FilledButton {...rest}>{children}</FilledButton>;
		default:
			return <FilledButton {...rest}>{children}</FilledButton>;
	}
};
