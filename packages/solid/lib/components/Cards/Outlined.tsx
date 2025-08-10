import { CardProps } from "./index";
import { tv } from "tailwind-variants";
import { Component, splitProps } from "solid-js";

export const OutlinedCard: Component<CardProps> = (props) => {
	const [v, rest] = splitProps(props, ["class", "variant"]);

	const styles = tv({
		base: "relative bg-surface border-1 border-outline-variant rounded-xl overflow-clip"
	});

	return (
		<div class={styles({ class: v.class })} {...rest}>
			{rest.children}
		</div>
	);
};
