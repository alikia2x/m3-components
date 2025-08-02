import { Component, createEffect, createSignal, JSX, splitProps, useContext } from "solid-js";
import { NavigationRailContext } from "./context";
import { tv } from "tailwind-variants";
import { animate } from "animejs";

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
				]
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
				]
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
