import { CardProps } from "./index";
import { tv } from "tailwind-variants";
import { Component, splitProps } from "solid-js";

export const OutlinedCard: Component<CardProps> = (props) => {
	const [v, rest] = splitProps(props, ["class", "variant"]);

	const styles = tv({
		base: "relative bg-surface outline-1 outline-outline-variant rounded-xl overflow-clip"
	});

	return (
		<div class={styles({ class: v.class })} {...rest}>
			{rest.children}
		</div>
	);
};
