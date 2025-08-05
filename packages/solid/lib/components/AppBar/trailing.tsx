import { Component, splitProps } from "solid-js";
import { tv } from "tailwind-variants";
import { DivProps } from "./index";

export const AppBarTrailingElement: Component<DivProps> = (props) => {
	const [v, rest] = splitProps(props, ["class"]);
	const style = tv({
		base: "relative w-12 h-12 items-center justify-center flex"
	});
	return (
		<div class={style({ class: v.class })} {...rest}>
			{rest.children}
		</div>
	);
};

export const AppBarTrailingElementGroup: Component<DivProps> = (props) => {
	const [v, rest] = splitProps(props, ["class"]);
	const style = tv({
		base: "relative ml-2 mr-1 w-auto h-12 flex justify-end grow shrink basis-0"
	});
	return (
		<div class={style({ class: v.class })} {...rest}>
			{rest.children}
		</div>
	);
};