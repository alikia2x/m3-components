import { Component, JSX } from "solid-js";
import { getClass } from "@utils/getClass";
import { tv } from "tailwind-variants";
import { useRipple } from "@utils/useRipple";

export interface CardActionAreaProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export const CardActionArea: Component<CardActionAreaProps> = ({ children, ...props }) => {
	const [className, restWithoutClass] = getClass(props);
	const style = tv({
		base: ""
	});
	const { onMouseDown } = useRipple();
	return (
		<div class={style({ className })} {...restWithoutClass}>
			<div class="hover:bg-on-surface/[0.08] absolute top-0 left-0 w-full h-full duration-150" onMouseDown={onMouseDown}></div>
			{children}
		</div>
	);
};
