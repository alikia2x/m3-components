import { type Component } from "solid-js";
import { NavigationRail } from "@m3-components/solid";
import { Desktop } from "@components/Desktop.solid.tsx";

export const NavigationRailDemo: Component = () => {
	return (
		<Desktop>
			<NavigationRail>
				hi.
			</NavigationRail>
		</Desktop>
	);
};
