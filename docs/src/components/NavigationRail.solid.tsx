import { type Component, createSignal, For, Match, Switch } from "solid-js";
import { NavigationRail, NavigationRailAction } from "@m3-components/solid";
import { Desktop } from "@components/Desktop.solid.tsx";
import { Home } from "@components/icons/Home.solid.tsx";
import { Button } from "@m3-components/solid";
import { tv } from "tailwind-variants";

export const NavigationRailDemo: Component = () => {
	const [actions, setActions] = createSignal([
		{
			icon: <Home />,
			label: "Home"
		}
	]);
	const [active, setActive] = createSignal(-1);
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
				<For each={actions()}>
					{(action, index) => (
						<NavigationRailAction
							activated={active() == index()}
							label={action.label}
							icon={action.icon}
							class="bg-red-500"
							aria-disabled={expanded()}
							onClick={() => {
								setActive(index);
							}}
						/>
					)}
				</For>
			</NavigationRail>
			<div class="ml-80 mt-10">
				<Button onClick={() => setExpanded(!expanded())}>
					<Switch>
						<Match when={expanded()}>
							<span>Collapse</span>
						</Match>
						<Match when={!expanded()}>
							<span>Expand</span>
						</Match>
					</Switch>
				</Button>
			</div>
		</Desktop>
	);
};
