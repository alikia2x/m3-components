import { Component, JSX, splitProps } from "solid-js";
import { tv } from "tailwind-variants";
import { type TitleLevel, NativeHeading } from "./NativeHeading";

interface TitleProps extends JSX.HTMLAttributes<HTMLHeadingElement> {
	level?: TitleLevel;
	variant?: "large" | "medium" | "small";
}

export const Title: Component<TitleProps> = (props) => {
	const titleStyle = tv({
		base: "",
		variants: {
			variant: {
				large: "text-[1.375rem] leading-7",
				medium: "text-base leading-6 font-medium",
				small: "text-sm leading-5 font-medium"
			}
		},
		defaultVariants: {
			variant: "large"
		}
	});
	const [v, rest] = splitProps(props, ["class", "variant", "level"]);
	return (
		<NativeHeading level={v.level || "h3"} class={titleStyle({ class: v.class, variant: v.variant })} {...rest}>
			{rest.children}
		</NativeHeading>
	);
};
