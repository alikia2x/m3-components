import { Component, JSX } from "solid-js";
import { tv } from "tailwind-variants";
import { getClass } from "@utils/getClass";
import { type HeadlineLevel, NativeHeading } from "./NativeHeading";

interface HeadlineProps extends JSX.HTMLAttributes<HTMLHeadingElement> {
	level?: HeadlineLevel;
	variant?: "large" | "medium" | "small";
}

export const Headline: Component<HeadlineProps> = ({ variant = "medium", level = "h1", children, ...props }) => {
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
	const [className, restWithoutClass] = getClass(props);
	return (
		<NativeHeading level={level} class={headlineStyle({ className, variant })} {...restWithoutClass}>
			{children}
		</NativeHeading>
	);
};
