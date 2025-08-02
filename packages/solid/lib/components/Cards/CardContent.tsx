import { Component, JSX, splitProps } from "solid-js";
import { tv } from "tailwind-variants";

export const CardContent: Component<JSX.HTMLAttributes<HTMLDivElement>> = (props) => {
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
