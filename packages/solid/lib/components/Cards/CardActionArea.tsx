import { Component, JSX, splitProps } from "solid-js";
import { tv } from "tailwind-variants";
import { useRipple } from "@utils/useRipple";

export interface CardActionAreaProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export const CardActionArea: Component<CardActionAreaProps> = ({ children, ...props }) => {
	const [v, rest] = splitProps(props, ["class"]);
	const style = tv({
		base: ""
	});
	const { onMouseDown } = useRipple();
	return (
		<div class={style({ class: v.class })} {...rest}>
			<div
				class="hover:bg-on-surface/[0.08] absolute top-0 left-0 w-full h-full duration-150"
				onMouseDown={onMouseDown}
			></div>
			{children}
		</div>
	);
};
