import { Component, JSX, splitProps } from "solid-js";
import { useRipple } from "@utils/useRipple";
import { tv } from "tailwind-variants";

export interface IconButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
	children?: JSX.Element;
	ripple?: boolean;
}

export const IconButton: Component<IconButtonProps> = (props) => {
	const { onMouseDown } = useRipple({ ripple: props.ripple ?? true });
	const [v, rest] = splitProps(props, ["class", "ripple", "disabled", "ref"]);

	const buttonStyles = tv({
		base: "duration-150 h-10 w-10 text-2xl select-none flex rounded-full \
        items-center justify-center relative overflow-hidden disabled:text-on-surface/40\
        disabled:dark:text-dark-on-surface/40"
	});
	const stateLayerStyles = tv({
		base: "absolute w-full h-full enabled:hover:bg-primary/10 enabled:dark:hover:bg-dark-primary/10 left-10 top-0",
		variants: {
			disabled: {
				true: "bg-on-surface/10 dark:bg-dark-on-surface/10"
			}
		}
	});

	return (
		<button
			class={buttonStyles({ class: v.class })}
			{...rest}
			ref={v.ref as unknown as (el: HTMLButtonElement) => void}
		>
			<div class={stateLayerStyles({ disabled: v.disabled })} onMouseDown={onMouseDown}></div>
			{rest.children}
		</button>
	);
};
