import { Component, JSX } from "solid-js";
import { tv } from "tailwind-variants";
import { getRestProps } from "@utils/getClass";
import { type HeadlineLevel, NativeHeading } from "./NativeHeading";

interface HeadlineProps extends JSX.HTMLAttributes<HTMLHeadingElement> {
	level?: HeadlineLevel;
	variant?: "large" | "medium" | "small";
}

export const Headline: Component<HeadlineProps> = (props) => {
	const headlineStyle = tv({
		base: "",
		variants: {
			variant: {
				large: "text-[3.5625rem] leading-16",
				medium: "text-[2.8125rem] leading-[3.25rem]",
				small: "text-4xl leading-11"
			}
		}
	});
	const rest = getRestProps(props, ["class", "variant", "level"]);
	return (
		<NativeHeading level={props.level || "h1"} class={headlineStyle({ class: props.class, variant: props.variant })} {...rest}>
			{props.children}
		</NativeHeading>
	);
};
