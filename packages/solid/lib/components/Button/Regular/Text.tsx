import { Component, splitProps } from "solid-js";
import { baseButton, ButtonProps } from "./index";
import { useRipple } from "@utils/useRipple";
import { tv } from "tailwind-variants";

export const TextButton: Component<ButtonProps> = (props) => {
	const [v, rest] = splitProps(props, ["class", "ripple", "size", "shape"]);

	const stateLayerStyle = tv({
		base: "absolute w-full h-full enabled:hover:bg-primary/10 enabled:dark:hover:bg-dark-primary/10 \
                left-0 top-0",
		variants: {
			disabled: {
				true: "bg-on-surface/10 dark:bg-dark-on-surface/10"
			}
		}
	});

	const style = tv({
		extend: baseButton,
		base: [
			"text-primary dark:text-dark-primary ",
			"disabled:text-on-surface/40 disabled:dark:text-dark-on-surface/40",
			"relative flex items-center justify-center overflow-hidden",
			"duration-150 select-none"
		]
	});

	const { onMouseDown } = useRipple({ ripple: v.ripple ?? true });

	return (
		<button
			class={style({ class: v.class, shape: v.shape, size: v.size })}
			{...rest}
			ref={rest.ref as unknown as (el: HTMLButtonElement) => void}
		>
			<div class={stateLayerStyle({ disabled: rest.disabled })} onMouseDown={onMouseDown}></div>
			{rest.children}
		</button>
	);
};
