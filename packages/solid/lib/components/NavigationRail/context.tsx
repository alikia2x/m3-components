import { createContext, useContext } from "solid-js";
import { NavigationRailProps } from "./index";

export const NavigationRailContext = createContext<boolean>();

export function NRProvider(props: NavigationRailProps) {
	return (
		<NavigationRailContext.Provider value={props.expanded}>
			{props.children}
		</NavigationRailContext.Provider>
	);
}

export function useNRContext() {
	return useContext(NavigationRailContext);
}
