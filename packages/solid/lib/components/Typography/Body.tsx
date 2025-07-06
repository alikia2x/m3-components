import { Component, JSX } from "solid-js";
import { tv } from "tailwind-variants";
import { getClass } from "@utils/getClass";

interface BodyProps extends JSX.HTMLAttributes<HTMLHeadingElement> {
	variant?: "large" | "medium" | "small";
}

export const Body: Component<BodyProps> = ({ variant = "medium", children, ...props }) => {
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
	const [className, restWithoutClass] = getClass(props);
	return (
		<p class={bodyStyle({ className, variant })} {...restWithoutClass}>
			{children}
		</p>
	);
};
