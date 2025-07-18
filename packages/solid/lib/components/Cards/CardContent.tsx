import { Component, JSX } from "solid-js";
import { getRestProps } from "@utils/getClass";
import { tv } from "tailwind-variants";

export interface CardContentProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export const CardContent: Component<CardContentProps> = (props) => {
	const rest = getRestProps(props, ["class"]);
	const style = tv({
		base: "p-6 pb-5"
	});
	return (
		<div class={style({ class: props.class })} {...rest}>
			{props.children}
		</div>
	);
};
