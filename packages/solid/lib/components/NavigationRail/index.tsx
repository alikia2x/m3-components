import { Component, createEffect, createSignal, JSX, splitProps, useContext } from "solid-js";
import { tv } from "tailwind-variants";
import { NavigationRailContext, NRProvider } from "./context";
import { animate } from "animejs";

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
	let labelElement: HTMLSpanElement | undefined;
	const expanded = useContext(NavigationRailContext) || (() => false);
	const [labelWidth, setLabelWidth] = createSignal(0);
	const indicatorStyleString = () => {
		if (!expanded()) return "";
		const finalWidth = 64 + labelWidth();
		return `width: ${finalWidth}px;`;
	};

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
				false: "w-0"
			},
			expanded: {
				false: "h-8 top-1 w-14",
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

	return (
		<div class={style({ class: v.class, expanded: expanded() })} {...rest}>
			<div
				class={activeIndicatorStyle({ activated: v.activated, expanded: expanded() })}
				style={indicatorStyleString()}
			/>
			<div class={iconStyle({ expanded: expanded() })}>{v.icon}</div>
			<div class={labelStyle({ expanded: expanded() })}>
				<span class="text-sm leading-5" ref={labelElement}>
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

export const NavigationRailInner: Component<NavigationRailProps> = (props) => {
	const [initialized, setInitialized] = createSignal(false);
	const [lastExpanded, setLastExpanded] = createSignal(false);
	let navElement: HTMLDivElement | undefined;
	const style = tv({
		base: "h-full flex flex-col pt-10 fixed duration-200",
		variants: {
			expanded: {
				true: "",
				false: "w-24"
			}
		}
	});

	const [v, rest] = splitProps(props, ["class", "expanded", "width"]);

	createEffect(() => {
		if (!navElement) return;
		if (initialized() && lastExpanded() != v.expanded) {
			animate(navElement, {
				opacity: [
					{ to: 0, duration: 0 },
					{ to: 1, duration: 400, delay: 0 }
				]
			});
			setLastExpanded(v.expanded || false);
		} else {
			setInitialized(true);
		}
	});

	return (
		<nav
			class={style({ class: v.class, expanded: v.expanded })}
			style={v.expanded ? `width: ${v.width}px;` : ""}
			{...rest}
		>
			<div ref={navElement}>{rest.children}</div>
		</nav>
	);
};
