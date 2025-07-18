import { Component } from "solid-js";
import { baseButton, ButtonProps, getShapeClasses, getSizeClasses } from "./index";
import { useRipple } from "@utils/useRipple";
import { getRestProps } from "@utils/getClass";
import { tv } from "tailwind-variants";

export const FilledButton: Component<ButtonProps> = (props) => {
	const rest = getRestProps(props, ["class", "ripple", "size", "shape"]);

	const { onMouseDown } = useRipple({ ripple: props.ripple ?? true });

	const style = tv({
		extend: baseButton,
		base: "bg-primary text-on-primary duration-150 select-none \
                flex items-center justify-center relative overflow-hidden"
	})

	return (
		<button
			class={style({
				class: props.class,
				shape: props.shape,
				size: props.size
			})}
			{...rest}
		>
			<div class="absolute w-full h-full hover:bg-on-surface-variant/10" onMouseDown={onMouseDown}></div>
			{props.children}
		</button>
	);
};
