import { Component, splitProps } from "solid-js";
import { baseButton, ButtonProps } from "./index";
import { useRipple } from "@utils/useRipple";
import { tv } from "tailwind-variants";

export const FilledButton: Component<ButtonProps> = (props) => {
	const [v, rest] = splitProps(props, ["class", "ripple", "size", "shape"]);

	const { onMouseDown } = useRipple({ ripple: v.ripple ?? true });

	const style = tv({
		extend: baseButton,
		base: "bg-primary text-on-primary duration-150 select-none \
                flex items-center justify-center relative overflow-hidden"
	})

	return (
		<button
			class={style({
				class: v.class,
				shape: v.shape,
				size: v.size
			})}
			{...rest}
		>
			<div class="absolute w-full h-full hover:bg-on-surface-variant/10" onMouseDown={onMouseDown}></div>
			{rest.children}
		</button>
	);
};
