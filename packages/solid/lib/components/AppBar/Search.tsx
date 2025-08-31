import { Component, JSX, splitProps, useContext } from "solid-js";
import { AppBarProps } from "./index";
import { tv } from "tailwind-variants";
import { AppBarContext } from "./context";

type AppBarSearchBoxProps = JSX.InputHTMLAttributes<HTMLInputElement>;

export const AppBarSearchBox: Component<AppBarSearchBoxProps> = (props) => {
	const scrolling = useContext(AppBarContext) || (() => false);
	const style = tv({
		base: [
			"w-full bg-surface-container-high h-14 rounded-full px-6 focus:outline-secondary",
			"focus:outline-[3px] focus:outline-offset-2 text-on-surface-variant"
		],
		variants: {
			scrolling: {
				true: "bg-surface-container-lowest"
			}
		}
	});
	const [v, rest] = splitProps(props, ["class"]);

	return <input class={style({ scrolling: scrolling(), class: v.class })} {...rest} />;
};

export const AppBarSearchContainer: Component<JSX.HTMLAttributes<HTMLDivElement>> = (props) => {
	const [v, rest] = splitProps(props, ["class"]);
	const style = tv({
		base: "w-[max(calc(50%-104px),min(calc(100%-104px),312px))]"
	});
	``;
	return (
		<div class={style({ class: v.class })} {...rest}>
			{rest.children}
		</div>
	);
};

export const SearchAppBar: Component<AppBarProps> = (props) => {
	const style = tv({
		base: "bg-surface sticky w-full h-16 top-0 flex justify-between duration-150 items-center",
		variants: {
			scrolling: {
				true: "bg-surface-container"
			}
		}
	});
	const [v, rest] = splitProps(props, ["class", "scrolling", "variant"]);
	return (
		<header class={style({ className: v.class, scrolling: v.scrolling })} {...rest}>
			{rest.children}
		</header>
	);
};
