import { Component, JSX, useContext } from "solid-js";
import { tv } from "tailwind-variants";
import { getClass } from "@utils/getClass";
import { NavigationRailContext, NRProvider } from "./context";

export interface NavigationRailProps extends JSX.HTMLAttributes<HTMLElement> {
	expanded?: boolean;
}

export interface NRActionProps extends JSX.HTMLAttributes<HTMLDivElement> {
	label?: string;
	icon?: JSX.Element;
}

export const NavigationRailAction: Component<NRActionProps> = ({ label, icon, children, ...rest }) => {
	const context = useContext(NavigationRailContext);
	const expanded = context || false;

	const style = tv({
		base: "relative h-16 flex items-center justify-center my-1 px-3 w-full",
		variants: {
			expanded: {
				true: "h-14",
				false: "flex-col gap-2"
			}
		}
	});

	const [className, restWithoutClass] = getClass(rest);

	return (
		<div class={style({ className, expanded })} {...restWithoutClass}>
			<div class="flex items-center justify-center text-2xl rounded-full bg-secondary-container w-full h-full">
				{icon}
			</div>
			<span class="text-sm">{label}</span>
		</div>
	);
};

export const NavigationRail: Component<NavigationRailProps> = (props) => {
	return (
		<NRProvider expanded={props.expanded}>
			<NavigationRailInner {...props}>{props.children}</NavigationRailInner>
		</NRProvider>
	);
};

export const NavigationRailInner: Component<NavigationRailProps> = ({ expanded = false, children, ...rest }) => {
	const style = tv({
		base: "w-24 h-full flex flex-col items-center px-3",
		variants: {}
	});
	const [className, restWithoutClass] = getClass(rest);
	return (
		<nav class={style({ className })} {...restWithoutClass}>
			{children}
		</nav>
	);
};
