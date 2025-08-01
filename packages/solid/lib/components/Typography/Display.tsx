import { Component, JSX, splitProps } from "solid-js";
import { tv } from "tailwind-variants";
import { type TitleLevel, NativeHeading } from "./NativeHeading";

interface DisplayProps extends JSX.HTMLAttributes<HTMLHeadingElement> {
	level?: TitleLevel;
	variant?: "large" | "medium" | "small";
}

export const Display: Component<DisplayProps> = (props) => {
	const headlineStyle = tv({
		base: "",
		variants: {
			variant: {
				large: "text-[3.5625rem] leading-16 tracking-[0.015625rem]",
				medium: "text-[2.8125rem] leading-[3.25rem]",
				small: "text-4xl leading-11"
			}
		},
		defaultVariants: {
			variant: "small"
		}
	});
	const [v, rest] = splitProps(props, ["class", "variant", "level"]);
	return (
		<NativeHeading level={v.level || "h1"} class={headlineStyle({ class: v.class, variant: v.variant })} {...rest}>
			{rest.children}
		</NativeHeading>
	);
};
