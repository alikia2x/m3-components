import { Component, JSX, useContext } from "solid-js";
import { tv } from "tailwind-variants";
import { getRestProps } from "@utils/getClass";
import { NavigationRailContext, NRProvider } from "./context";

export interface NavigationRailProps extends JSX.HTMLAttributes<HTMLElement> {
	expanded?: boolean;
}

export interface NRActionProps extends JSX.HTMLAttributes<HTMLDivElement> {
	activated?: boolean;
	label?: string;
	icon?: JSX.Element;
}

export const NavigationRailAction: Component<NRActionProps> = (props) => {
	const context = useContext(NavigationRailContext);
	const expanded = context || false;

	const style = tv({
		base: "relative flex items-center justify-center w-14",
		variants: {
			expanded: {
				true: "h-14",
				false: "w-16 h-16 flex-col gap-1 duration-150 my-1.5",
			}
		}
	});

	const activeIndicatorStyle = tv({
		base: "flex items-center justify-center text-2xl rounded-full w-14 h-8",
		variants: {
			activated: {
				true: "bg-secondary-container text-on-secondary-container",
			}
		}
	})

	const rest = getRestProps(props, ["class", "activated", "label", "icon"]);

	return (
		<div class={style({ class: props.class, expanded })} {...rest}>
			<div class={activeIndicatorStyle({ activated: props.activated })}>
				{props.icon}
			</div>
			<span class="text-sm">{props.label}</span>
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

export const NavigationRailInner: Component<NavigationRailProps> = (props) => {
	const style = tv({
		base: "h-full flex flex-col items-center px-3 pt-10 fixed duration-150",
		variants: {
			expanded: {
				true: "min-w-55 max-w-90",
				false: "w-24"
			}
		}
	});

	const rest = getRestProps(props, ["class", "expanded"]);

	return (
		<nav class={style({ class: props.class, expanded: props.expanded })} {...rest} >
			{props.children}
		</nav>
	);
};
