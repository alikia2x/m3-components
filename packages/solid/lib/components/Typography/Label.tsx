import { Component, JSX, splitProps } from "solid-js";
import { tv } from "tailwind-variants";

interface LabelProps extends JSX.HTMLAttributes<HTMLSpanElement> {
	variant?: "large" | "medium" | "small";
}

export const Label: Component<LabelProps> = (props) => {
	const bodyStyle = tv({
		base: "",
		variants: {
			variant: {
				large: "text-sm leading-5 font-medium tracking-[0.00625rem]",
				medium: "text-xs leading-4 font-medium tracking-[0.03125rem]",
				small: "text-[0.6875rem] leading-4 tracking-[0.03125rem]"
			}
		},
		defaultVariants: {
			variant: "large"
		}
	});
	const [v, rest] = splitProps(props, ["class", "variant"]);
	return (
		<span class={bodyStyle({ class: v.class, variant: v.variant })} {...rest}>
			{rest.children}
		</span>
	);
};
