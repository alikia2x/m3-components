import { Component, JSX, splitProps } from "solid-js";
import { tv } from "tailwind-variants";

interface BodyProps extends JSX.HTMLAttributes<HTMLParagraphElement> {
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
		},
		defaultVariants: {
			variant: "large"
		}
	});
	const [v, rest] = splitProps(props, ["class", "variant"]);
	return (
		<p class={bodyStyle({ class: v.class, variant: v.variant })} {...rest}>
			{rest.children}
		</p>
	);
};
