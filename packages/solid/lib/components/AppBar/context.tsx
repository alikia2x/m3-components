import { Accessor, createContext, JSX } from "solid-js";

export const AppBarContext = createContext<Accessor<boolean>>();

export function ABProvider(props: { children: JSX.Element; scrolling: Accessor<boolean> }) {
	return <AppBarContext.Provider value={props.scrolling}>{props.children}</AppBarContext.Provider>;
}
