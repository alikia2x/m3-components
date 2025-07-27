import { Component, createEffect, createSignal, JSX, Match, splitProps, Switch, useContext } from "solid-js";
import { tv } from "tailwind-variants";
import { NavigationRailContext, NRProvider } from "./context";
import { animate, utils } from "animejs";
import { IconButton } from "../Button/Icon";
import { Menu, MenuOpen } from "./icon";

export interface NavigationRailProps extends JSX.HTMLAttributes<HTMLElement> {
	expanded?: boolean;
	width?: number;
}

export interface NRActionProps extends JSX.HTMLAttributes<HTMLDivElement> {
	activated?: boolean;
	label?: string;
	icon?: JSX.Element;
}

export const NavigationRailAction: Component<NRActionProps> = (props) => {
	let el: HTMLDivElement | undefined;
	let labelElement: HTMLSpanElement | undefined;
	const [initialized, setInitialized] = createSignal(false);
	const expanded = useContext(NavigationRailContext) || (() => false);
	const [labelWidth, setLabelWidth] = createSignal(0);

	const style = tv({
		base: "relative flex",
		variants: {
			expanded: {
				true: "w-full h-14 px-5",
				false: "flex-col items-center w-16 h-16 left-4 my-1.5"
			}
		}
	});

	const activeIndicatorStyle = tv({
		base: "absolute z-[-1] flex items-center justify-center rounded-full",
		variants: {
			activated: {
				true: "bg-secondary-container text-on-secondary-container",
				false: "opacity-0"
			},
			expanded: {
				false: "h-8 top-1",
				true: "h-14 top-0"
			}
		}
	});

	const iconStyle = tv({
		base: "w-6 h-6 text-2xl relative",
		variants: {
			expanded: {
				false: "top-2",
				true: "top-4 left-4"
			}
		}
	});

	const labelStyle = tv({
		base: "relative",
		variants: {
			expanded: {
				false: "top-3",
				true: "top-4 left-6"
			}
		}
	});

	const [v, rest] = splitProps(props, ["class", "activated", "label", "icon"]);

	createEffect(() => {
		setLabelWidth(labelElement?.getBoundingClientRect().width || 0);
	});

	createEffect(() => {
		if (!el || !v.activated) return;
		if (expanded()) {
			animate(el, {
				width: [
					{ to: 56, duration: 0 },
					{ to: 64 + labelWidth(), duration: initialized() ? 200 : 0, delay: 0 }
				],
				opacity: [
					{ to: 0, duration: 0 },
					{ to: 1, duration: initialized() ? 200 : 0, delay: 0 }
				],
			});
		} else {
			animate(el, {
				width: [
					{ to: 0, duration: 0 },
					{ to: 56, duration: initialized() ? 200 : 0, delay: 0 }
				],
				opacity: [
					{ to: 0, duration: 0 },
					{ to: 1, duration: initialized() ? 200 : 0, delay: 0 }
				],
			});
		}
		setInitialized(true);
	});

	return (
		<div class={style({ class: v.class, expanded: expanded() })} {...rest}>
			<div class={activeIndicatorStyle({ activated: v.activated, expanded: expanded() })} ref={el} />
			<div class={iconStyle({ expanded: expanded() })}>{v.icon}</div>
			<div class={labelStyle({ expanded: expanded() })}>
				<span class="text-sm leading-5 select-none" ref={labelElement}>
					{v.label}
				</span>
			</div>
		</div>
	);
};

export const NavigationRail: Component<NavigationRailProps> = (props) => {
	const expanded = () => props.expanded || false;
	return (
		<NRProvider expanded={expanded}>
			<NavigationRailInner {...props}>{props.children}</NavigationRailInner>
		</NRProvider>
	);
};

export const NavigationRailMenu: Component<JSX.HTMLAttributes<HTMLButtonElement>> = (props) => {
	let elMenu: SVGSVGElement | undefined;
	let elOpen: SVGSVGElement | undefined;
	const expanded = useContext(NavigationRailContext) || (() => false);
	const [initialized, setInitialized] = createSignal(false);
	const [lastExpanded, setLastExpanded] = createSignal(expanded());
	const style = tv({
		base: "ml-7"
	});
	const [v, rest] = splitProps(props, ["class"]);

	const initializeStyle = () => {
		utils.set(elMenu!, {
			opacity: expanded() ? 0 : 1
		});
		utils.set(elOpen!, {
			opacity: expanded() ? 1 : 0
		});
	};

	const playAnimation = () => {
		if (expanded()) {
			utils.set(elOpen!, {
				opacity: 0,
				rotate: -180
			});
			utils.set(elMenu!, {
				opacity: 1,
				rotate: 0
			});
			animate(elMenu!, {
				opacity: 0,
				rotate: 180,
				duration: 200
			});
			animate(elOpen!, {
				opacity: 1,
				rotate: 0,
				duration: 200
			});
		} else {
			utils.set(elOpen!, {
				opacity: 1,
				rotate: 0
			});
			utils.set(elMenu!, {
				opacity: 0,
				rotate: 180
			});
			animate(elOpen!, {
				opacity: 0,
				rotate: -180,
				duration: 200
			});
			animate(elMenu!, {
				opacity: 1,
				rotate: 0,
				duration: 200
			});
		}
	};

	createEffect(() => {
		if (!elMenu || !elOpen) return;
		if (!initialized()) {
			initializeStyle();
		}
		if (initialized() && lastExpanded() != expanded()) {
			playAnimation();
			setLastExpanded(expanded() || false);
		}
		setInitialized(true);
	});

	return (
		<IconButton class={style({ class: v.class })} {...rest}>
			<MenuOpen class="absolute" style="opacity: 0" ref={elOpen} />
			<Menu class="absolute" style="opacity: 0" ref={elMenu} />
		</IconButton>
	);
};

export const NavigationRailActions: Component<JSX.HTMLAttributes<HTMLDivElement>> = (props) => {
	const expanded = useContext(NavigationRailContext) || (() => false);
	const [initialized, setInitialized] = createSignal(false);
	const [lastExpanded, setLastExpanded] = createSignal(expanded());
	let el: HTMLDivElement | undefined;
	const [v, rest] = splitProps(props, ["class"]);
	const style = tv({
		base: "mt-10"
	});
	createEffect(() => {
		if (!el) return;
		if (initialized() && lastExpanded() != expanded()) {
			animate(el, {
				opacity: [
					{ to: 0, duration: 0 },
					{ to: 1, duration: 400, delay: 0 }
				]
			});
			setLastExpanded(expanded() || false);
		} else {
			setInitialized(true);
		}
	});
	return (
		<div class={style({ class: v.class })} {...rest} ref={el}>
			{rest.children}
		</div>
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
