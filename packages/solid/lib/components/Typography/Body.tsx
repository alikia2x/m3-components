import { Component, JSX } from "solid-js";
import { tv } from "tailwind-variants";
import { getRestProps } from "@utils/getClass";

interface BodyProps extends JSX.HTMLAttributes<HTMLHeadingElement> {
	variant?: "large" | "medium" | "small";
}

export const Body: Component<BodyProps> = (props) => {
	const bodyStyle = tv({
		base: "",
		variants: {
			variant: {
				large: "text-base leading-6",
				medium: "text-sm leading-5",
				small: "text-xs leading-4"
			}
		}
	});
	const rest = getRestProps(props, ["class", "variant"]);
	return (
		<p class={bodyStyle({ class: props.class, variant: props.variant })} {...rest}>
			{props.children}
		</p>
	);
};
