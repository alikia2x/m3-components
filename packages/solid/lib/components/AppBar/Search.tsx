import { Component, JSX, splitProps, useContext } from "solid-js";
import { AppBarProps } from "./index";
import { tv } from "tailwind-variants";
import { AppBarContext } from "./context";

type AppBarSearchBoxProps = JSX.InputHTMLAttributes<HTMLInputElement>;

export const AppBarSearchBox: Component<AppBarSearchBoxProps> = (props) => {
	const scrolling = useContext(AppBarContext) || (() => false);
	const style = tv({
		base: "bg-surface-container-high h-14 w-[max(50%,min(100%,312px))] rounded-full px-6 focus:outline-secondary\
        focus:outline-[3px] focus:outline-offset-2 text-on-surface-variant",
		variants: {
			scrolling: {
				true: "bg-surface-container-lowest"
			}
		}
	});
	const [v, rest] = splitProps(props, ["class"]);

	return (
		<div class="grow flex justify-center">
			<input class={style({ scrolling: scrolling(), class: v.class })} {...rest} />
		</div>
	);
};

export const SearchAppBar: Component<AppBarProps> = (props) => {
	const style = tv({
		base: "bg-surface sticky w-full h-16 top-0 flex justify-between items-center duration-150",
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
