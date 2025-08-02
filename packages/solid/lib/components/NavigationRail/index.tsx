// noinspection JSUnusedAssignment

import { Component, createEffect, createSignal, JSX, splitProps } from "solid-js";
import { tv } from "tailwind-variants";
import { NRProvider } from "./context";
import { animate, utils } from "animejs";

export interface NavigationRailProps extends JSX.HTMLAttributes<HTMLElement> {
	expanded?: boolean;
	width?: number;
}

export const NavigationRail: Component<NavigationRailProps> = (props) => {
	const expanded = () => props.expanded || false;
	return (
		<NRProvider expanded={expanded}>
			<NavigationRailInner {...props}>{props.children}</NavigationRailInner>
		</NRProvider>
	);
};

export const NavigationRailInner: Component<NavigationRailProps> = (props) => {
	let el: HTMLElement | undefined;
	const defaultWidth = 220;

	const [v, rest] = splitProps(props, ["class", "expanded", "width"]);
	const [initialized, setInitialized] = createSignal(false);
	const [lastExpanded, setLastExpanded] = createSignal(v.expanded);

	const clip = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

	createEffect(() => {
		if (!el) return;
		if (initialized() && lastExpanded() != v.expanded) {
			if (v.expanded) {
				animate(el, {
					width: clip(v.width || defaultWidth, 220, 360),
					duration: 250,
					ease: "cubicBezier(0.2, 0, 0, 1)"
				});
			} else {
				animate(el, {
					width: 96,
					duration: 250,
					ease: "cubicBezier(0.2, 0, 0, 1)"
				});
			}
			setLastExpanded(v.expanded);
		} else {
			setInitialized(true);
			utils.set(el, {
				width: v.expanded ? clip(v.width || defaultWidth, 220, 360) : 96
			});
		}
	});

	const style = tv({
		base: "h-full flex flex-col pt-10 fixed"
	});

	return (
		<nav class={style({ class: v.class })} ref={el} {...rest}>
			{rest.children}
		</nav>
	);
};

export * from "./action";
export * from "./buttons";
