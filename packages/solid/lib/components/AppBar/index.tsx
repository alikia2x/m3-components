import { Component, JSX, splitProps } from "solid-js";
import { SearchAppBar } from "./Search";
import { ABProvider } from "./context";

export type DivProps = JSX.HTMLAttributes<HTMLDivElement>;

export interface AppBarProps extends JSX.HTMLAttributes<HTMLElement> {
	scrolling?: boolean;
	expressive?: true;
	variant?: "search" | "small" | "medium-flexible" | "large-flexible";
	alignment?: "leading-edge" | "center";
}

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

export { AppBarSearchBox, AppBarSearchContainer } from "./Search";
export * from "./leading";
export * from "./trailing";
