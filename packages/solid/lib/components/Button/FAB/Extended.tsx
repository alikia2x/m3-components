import { Component, splitProps } from "solid-js";
import { useRipple } from "@utils/useRipple";
import { tv } from "tailwind-variants";
import { FABbaseStyle, FloatingActionButtonProps } from "./FAB";

export interface ExtendedFABProps extends Omit<FloatingActionButtonProps, 'size'> {
	text?: string;
    size?: "small" | "medium" | "large";
}

export const ExtendedFAB: Component<ExtendedFABProps> = (props) => {
	const [v, rest] = splitProps(props, ["class", "size", "color", "elevation", "position", "text"]);
	const style = tv({
		extend: FABbaseStyle,
		base: "relative overflow-clip duration-150 select-none flex items-center",
		variants: {
			size: {
				small: "text-2xl h-14 p-4 rounded-2xl gap-2",
				medium: "text-[1.75rem] h-20 p-5 rounded-[1.25rem] gap-3",
				large: "text-4xl h-24 p-7 rounded-[1.75rem] gap-4"
			}
		},
		defaultVariants: {
			position: "right",
			color: "primary-container",
			elevation: true,
			size: "small"
		}
	});

	const labelStyle = tv({
		variants: {
			size: {
				small: "text-base font-medium leading-6 tracking-[0.009375rem]",
				medium: "text-[1.375rem] leading-7",
				large: "text-2xl leading-8"
			}
		}
	});

	const { onMouseDown } = useRipple();

	return (
		<button
			class={style({
				class: v.class,
				size: v.size,
				color: v.color,
				elevation: v.elevation,
				position: v.position
			})}
			{...rest}
		>
			<div
				class="absolute top-0 left-0 w-full h-full hover:bg-on-surface-variant/10"
				onMouseDown={onMouseDown}
			></div>
			{rest.children}
			<span class={labelStyle({ size: v.size })}>{v.text}</span>
		</button>
	);
};
