import { Component, JSX } from "solid-js";
import { tv } from "tailwind-variants";
import { getClass } from "@utils/getClass";

export interface NavigationRailProps extends JSX.HTMLAttributes<HTMLElement> {
	filled?: boolean;
}

export const NavigationRail: Component<NavigationRailProps> = ({ filled = false, children, ...rest }) => {
	const style = tv({
		base: "w-24 h-full flex flex-col items-center",
		variants: {
			filled: {
				true: "bg-surface-container"
			}
		}
	});
	const [className, restWithoutClass] = getClass(rest);
	return (
		<nav class={style({ className })} {...restWithoutClass}>
			{children}
		</nav>
	);
};
