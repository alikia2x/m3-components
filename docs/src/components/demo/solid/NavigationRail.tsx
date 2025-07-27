import { type Component, createSignal, For } from "solid-js";
import { NavigationRail, NavigationRailAction, NavigationRailActions, NavigationRailMenu } from "@m3-components/solid";
import { Desktop } from "@components/demo/solid/Desktop.tsx";
import { Home } from "@components/icons/Home.solid.tsx";
import { History } from "@components/icons/History.solid.tsx";

export const NavigationRailDemo: Component = () => {
	const actions = [
		{
			icon: <Home />,
			label: "Home"
		},
		{
			icon: <History />,
			label: "History"
		}
	];
	const [active, setActive] = createSignal(0);
	const [expanded, setExpanded] = createSignal(false);

	return (
		<Desktop>
			<NavigationRail class="bg-surface-container" width={240} expanded={expanded()}>
				<NavigationRailMenu onClick={() => setExpanded(!expanded())} />
				<NavigationRailActions>
					<For each={actions}>
						{(action, index) => (
							<NavigationRailAction
								activated={active() == index()}
								label={action.label}
								icon={action.icon}
								onClick={() => {
									setActive(index);
								}}
							/>
						)}
					</For>
				</NavigationRailActions>
			</NavigationRail>
		</Desktop>
	);
};
