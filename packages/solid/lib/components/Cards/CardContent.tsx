import { Component, JSX, splitProps } from "solid-js";
import { tv } from "tailwind-variants";

export interface CardContentProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export const CardContent: Component<CardContentProps> = (props) => {
	const [v, rest] = splitProps(props, ["class"]);
	const style = tv({
		base: "p-6 pb-5"
	});
	return (
		<div class={style({ class: v.class })} {...rest}>
			{rest.children}
		</div>
	);
};
