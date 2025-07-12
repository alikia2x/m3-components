import { Component, JSX } from "solid-js";
import { useRipple } from "@utils/useRipple";
import { getClass } from "@utils/getClass";
import { tv } from "tailwind-variants";

export interface FloatingActionButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
	children?: JSX.Element;
	size: "baseline" | "medium" | "large";
	color: "primary-container" | "secondary-container" | "tertiary-container" | "primary" | "secondary" | "tertiary";
	elevation: boolean;
	position: "left" | "right" | "unset";
}

export const FloatingActionButton: Component<FloatingActionButtonProps> = ({
	children,
	size = "baseline",
	color = "primary-container",
	elevation = true,
	position = "right",
	...rest
}) => {
	const style = tv({
		base: "relative overflow-clip duration-150 select-none",
		variants: {
			position: {
				right: "fixed bottom-4 right-4",
				left: "fixed bottom-4 left-4",
				unset: ""
			},
			color: {
				primary: "bg-primary text-on-primary",
				secondary: "bg-secondary text-on-secondary",
				tertiary: "bg-tertiary text-on-tertiary",
				"primary-container": "bg-primary-container text-on-primary-container",
				"secondary-container": "bg-secondary-container text-on-secondary-container",
				"tertiary-container": "bg-tertiary-container text-on-tertiary-container"
			},
			elevation: {
				true: "shadow-md"
			},
			size: {
				baseline: "w-14 h-14 p-4 rounded-2xl",
				medium: "w-20 h-20 p-5 rounded-[1.25rem]",
				large: "w-24 h-24 p-7 rounded-[1.75rem]"
			},
		}
	});

	const [className, restWithoutClass] = getClass(rest);

	const { onMouseDown } = useRipple();

	return (
		<button class={style({ className, size, color, elevation, position })} {...restWithoutClass}>
			<div class="absolute top-0 left-0 w-full h-full hover:bg-on-surface-variant/10" onMouseDown={onMouseDown}></div>
			{children}
		</button>
	);
};
