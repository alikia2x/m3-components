import { Component, createEffect, createSignal, JSX, splitProps } from "solid-js";
import { SearchAppBar } from "./Search";
import { tv } from "tailwind-variants";
import { ABProvider } from "./context";

type DivProps = JSX.HTMLAttributes<HTMLDivElement>;

export interface AppBarProps extends JSX.HTMLAttributes<HTMLElement> {
	scrolling?: boolean;
	expressive?: true;
	variant?: "search" | "small" | "medium-flexible" | "large-flexible";
	alignment?: "leading-edge" | "center";
}

export const LeadingElement: Component<DivProps> = (props) => {
	const [v, rest] = splitProps(props, ["class"]);
	const styles = tv({
		base: "relative ml-1 mr-2 w-12 h-12 items-center justify-center flex"
	});
	return (
		<div class={styles({ class: v.class })} {...rest}>
			{props.children}
		</div>
	);
};

export const TrailingElementGroup: Component<{ children?: JSX.Element }> = ({ children }) => {
	return <div class="relative ml-2 mr-1 w-auto h-12 flex">{children}</div>;
};

export const TrailingElement: Component<{ children?: JSX.Element }> = ({ children }) => {
	return <div class="relative rounded-full w-12 h-12">{children}</div>;
};

export const AppBar: Component<AppBarProps> = (props) => {
	const scrolling = () => props.scrolling || false;
	return (
		<ABProvider scrolling={scrolling}>
			<AppBarInner {...props}>{props.children}</AppBarInner>
		</ABProvider>
	);
};

export const AppBarInner: Component<AppBarProps> = (props) => {
	const [v, rest] = splitProps(props, ["variant"]);

	switch (v.variant) {
		case "search":
			return <SearchAppBar {...rest} />;
		default:
			return <></>;
	}
};

export { AppBarSearchBox } from "./Search";
