import { type Component } from "solid-js";
import { NavigationRail, NavigationRailAction } from "@m3-components/solid";
import { Desktop } from "@components/Desktop.solid.tsx";
import { Home } from "@components/icons/Home.solid.tsx";

export const NavigationRailDemo: Component = () => {
	return (
		<Desktop>
			<NavigationRail>
				<NavigationRailAction icon={<Home />} label="Home" />
			</NavigationRail>
		</Desktop>
	);
};
