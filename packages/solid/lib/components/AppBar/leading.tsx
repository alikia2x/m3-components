import { Component, splitProps } from "solid-js";
import { tv } from "tailwind-variants";
import { DivProps } from "./index";

export const AppBarLeadingElement: Component<DivProps> = (props) => {
	const [v, rest] = splitProps(props, ["class"]);
	const style = tv({
		base: "relative ml-1 mr-2 h-12 items-center flex grow shrink basis-0"
	});
	return (
		<div class={style({ class: v.class })} {...rest}>
			{props.children}
		</div>
	);
};
