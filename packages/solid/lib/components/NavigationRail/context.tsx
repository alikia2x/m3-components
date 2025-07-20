import { Accessor, createContext, JSX } from "solid-js";

export const NavigationRailContext = createContext<Accessor<boolean>>();

export function NRProvider(props: { children: JSX.Element; expanded: Accessor<boolean> }) {
	return <NavigationRailContext.Provider value={props.expanded}>{props.children}</NavigationRailContext.Provider>;
}
