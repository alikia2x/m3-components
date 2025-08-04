import { Component, createEffect, createMemo, createSignal, JSX, onCleanup, splitProps, useContext } from "solid-js";
import { NavigationRailContext } from "./context";
import { tv } from "tailwind-variants";
import { animate, utils } from "animejs";
import { FloatingActionButton, FloatingActionButtonProps } from "../Button";
import { MenuButton } from "../Button/MenuButton";
import { makeEventListener } from "@solid-primitives/event-listener";

interface NavigationRailFABProps extends Omit<FloatingActionButtonProps, "position"> {
	text?: string;
}

export const NavigationRailFAB: Component<NavigationRailFABProps> = (props) => {
	let el: HTMLDivElement | undefined;
	let btn: HTMLButtonElement | undefined;
	const [v, rest] = splitProps(props, ["class", "text"]);
	const expanded = useContext(NavigationRailContext) || (() => false);
	const [labelWidth, setLabelWidth] = createSignal(0);

	const style = tv({
		base: "flex gap-2 top-5 left-5 transition-none"
	});

	const textStyle = tv({
		base: "text-base font-medium leading-6 duration-100 whitespace-nowrap",
		variants: {
			expanded: {
				false: "opacity-0",
				true: "opacity-100"
			}
		}
	});

	createEffect(() => {
		if (!el || !btn) return;
		const testEl = document.createElement("div");
		testEl.classList.add(
			"text-base",
			"font-medium",
			"leading-6",
			"whitespace-nowrap"
		);
		testEl.textContent = v.text || "";
		btn.appendChild(testEl);
		setLabelWidth(testEl.getBoundingClientRect().width || 0);
		btn.removeChild(testEl);
	});

	createMemo(() => {
		const width = labelWidth();
		if (expanded()) {
			btn &&
				utils.set(btn!, {
					width: 64 + width
				});
		}
		if (!btn) return;
		if (expanded()) {
			animate(btn, {
				width: 64 + width,
				duration: 100
			});
		} else {
			animate(btn, {
				width: 56,
				duration: 100
			});
		}
		return expanded();
	});

	let clear: () => void = () => {};
	createEffect(() => {
		clear = makeEventListener(
			window,
			"resize",
			() => {
				btn &&
					utils.set(btn!, {
						width: expanded() ? 64 + labelWidth() : 56
					});
			},
			{ passive: true }
		);
	});
	onCleanup(() => {
		clear();
	});

	return (
		<FloatingActionButton class={style({ class: v.class })} ref={btn} position="unset" {...rest}>
			<div class="w-6 h-6">{rest.children}</div>
			<span class={textStyle({ expanded: expanded() })} ref={el}>
				{v.text}
			</span>
		</FloatingActionButton>
	);
};
export const NavigationRailMenu: Component<JSX.HTMLAttributes<HTMLButtonElement>> = (props) => {
	const expanded = useContext(NavigationRailContext) || (() => false);

	return <MenuButton class="ml-7" expanded={expanded()} {...props} />;
};
