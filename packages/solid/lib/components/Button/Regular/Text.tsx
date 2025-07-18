import { Component } from "solid-js";
import { baseButton, ButtonProps, getShapeClasses, getSizeClasses } from "./index";
import { useRipple } from "@utils/useRipple";
import { getRestProps } from "@utils/getClass";
import { tv } from "tailwind-variants";

export const TextButton: Component<ButtonProps> = (props) => {
	const rest = getRestProps(props, ["class", "ripple", "size", "shape"]);

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

	const { onMouseDown } = useRipple({ ripple: props.ripple ?? true });

	return (
		<button
			class={style({ class: props.class, shape: props.shape, size: props.size })}
			{...rest}
			ref={props.ref as unknown as (el: HTMLButtonElement) => void}
		>
			<div class={stateLayerStyle({ disabled: props.disabled })} onMouseDown={onMouseDown}></div>
			{props.children}
		</button>
	);
};
