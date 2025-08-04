import { Component, splitProps } from "solid-js";
import { baseButton, ButtonProps } from "./index";
import { useRipple } from "@utils/useRipple";
import { tv } from "tailwind-variants";

export const TextButton: Component<ButtonProps> = (props) => {
	const [v, rest] = splitProps(props, ["class", "ripple", "size", "shape"]);

	const stateLayerStyle = tv({
		base: "absolute w-full h-full left-0 top-0",
		variants: {
			disabled: {
				true: "bg-on-surface/10",
				false: "hover:bg-primary/8"
			}
		}
	});

	const style = tv({
		extend: baseButton,
		base: "relative flex items-center justify-center overflow-hidden duration-150 select-none",
		variants: {
			disabled: {
				true: "text-on-surface/40",
				false: "text-primary"
			}
		}
	});

	const { onMouseDown } = useRipple({ ripple: v.ripple ?? true });

	return (
		<button
			class={style({ class: v.class, shape: v.shape, size: v.size, disabled: rest.disabled || false })}
			ref={rest.ref as unknown as (el: HTMLButtonElement) => void}
			{...rest}
		>
			<div class={stateLayerStyle({ disabled: rest.disabled || false })} onMouseDown={onMouseDown}></div>
			{rest.children}
		</button>
	);
};
