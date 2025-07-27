import { type Component, createSignal, For, Match, Switch } from "solid-js";
import {
	IconButton,
	NavigationRail,
	NavigationRailAction,
	NavigationRailActions,
	NavigationRailMenu
} from "@m3-components/solid";
import { Desktop } from "@components/demo/solid/Desktop.tsx";
import { Home } from "@components/icons/Home.solid.tsx";
import { tv } from "tailwind-variants";

export const NavigationRailDemo: Component = () => {
	const [actions, setActions] = createSignal([
		{
			icon: <Home />,
			label: "Home"
		}
	]);
	const [active, setActive] = createSignal(0);
	const [expanded, setExpanded] = createSignal(false);
	const style = tv({
		base: "bg-surface-container",
		variants: {
			expanded: {
				true: "w-60"
			}
		}
	});
	return (
		<Desktop>
			<NavigationRail class={style({ expanded: expanded() })} expanded={expanded()}>
				<NavigationRailMenu onClick={() => setExpanded(!expanded())} />
				<NavigationRailActions>
					<For each={actions()}>
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
