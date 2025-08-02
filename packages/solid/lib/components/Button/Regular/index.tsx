import { Component, JSX } from "solid-js";
import { TextButton } from "./Text";
import { FilledButton } from "./Filled";
import { tv } from "tailwind-variants";

export type ButtonShape = "round" | "square";
export type ButtonSize = "extra-small" | "small" | "medium" | "large" | "extra-large";

export interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
	children?: JSX.Element;
	size?: ButtonSize;
	shape?: ButtonShape;
	ripple?: boolean;
}

export interface ButtonRootProps extends ButtonProps {
	variant?: "text" | "filled";
}

export const getShapeClasses = (shape: ButtonShape, size: ButtonSize) => {
	switch (size) {
		case "small":
			return shape === "round" ? "rounded-full" : "rounded-xl";
		default:
			return shape === "round" ? "rounded-full" : "rounded-2xl";
	}
};

export const getSizeClasses = (size: ButtonSize) => {
	switch (size) {
		case "medium":
			return "text-base leading-6 h-14 px-6";
		case "large":
			return "text-2xl h-24 px-12";
		default:
			return "text-sm leading-5 h-10 px-4";
	}
};

export const baseButton = tv({
	variants: {
		size: {
			"extra-small": "text-sm leading-5 h-8 px-3",
			small: "text-sm leading-5 h-10 px-4",
			medium: "text-base leading-6 h-14 px-6",
			large: "text-2xl h-24 px-12",
			"extra-large": "text-[2rem] leading-10 h-34 px-16"
		},
		shape: {
			round: "rounded-full",
			square: "rounded-2xl"
		}
	},
	compoundVariants: [
		{
			size: "small",
			shape: "square",
			class: "rounded-xl"
		}
	],
	defaultVariants: {
		size: "small",
		shape: "round"
	}
});

export const Button: Component<ButtonRootProps> = (props) => {
	switch (props.variant) {
		case "text":
			return <TextButton {...props}>{props.children}</TextButton>;
		case "filled":
			return <FilledButton {...props}>{props.children}</FilledButton>;
		default:
			return <FilledButton {...props}>{props.children}</FilledButton>;
	}
};
