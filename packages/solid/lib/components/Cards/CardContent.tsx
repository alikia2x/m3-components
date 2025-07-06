import { Component, JSX } from "solid-js";
import { getClass } from "@utils/getClass";
import { tv } from "tailwind-variants";

export interface CardContentProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export const CardContent: Component<CardContentProps> = ({ children, ...props }) => {
	const [className, restWithoutClass] = getClass(props);
	const style = tv({
		base: "p-6 pb-5"
	});
	return (
		<div class={style({ className })} {...restWithoutClass}>
			{children}
		</div>
	);
};
