import { Component, createEffect, createSignal, JSX, splitProps } from "solid-js";
import { animate, utils } from "animejs";
import { IconButton } from "../Icon";
import { Menu, MenuOpen } from "../../Icons/Menu";

interface MenuButtonProps extends JSX.HTMLAttributes<HTMLButtonElement> {
	expanded?: boolean;
}

export const MenuButton: Component<MenuButtonProps> = (props) => {
	let elMenu: SVGSVGElement | undefined;
	let elOpen: SVGSVGElement | undefined;
	const [initialized, setInitialized] = createSignal(false);
	const [lastExpanded, setLastExpanded] = createSignal(props.expanded);
	const [v, rest] = splitProps(props, ["class", "expanded"]);

	const initializeStyle = () => {
		utils.set(elMenu!, {
			opacity: props.expanded ? 0 : 1
		});
		utils.set(elOpen!, {
			opacity: props.expanded ? 1 : 0
		});
	};

	const playAnimation = () => {
		if (props.expanded) {
			utils.set(elOpen!, {
				opacity: 0,
				rotate: -180
			});
			utils.set(elMenu!, {
				opacity: 1,
				rotate: 0
			});
			animate(elMenu!, {
				opacity: 0,
				rotate: 180,
				duration: 200
			});
			animate(elOpen!, {
				opacity: 1,
				rotate: 0,
				duration: 200
			});
		} else {
			utils.set(elOpen!, {
				opacity: 1,
				rotate: 0
			});
			utils.set(elMenu!, {
				opacity: 0,
				rotate: 180
			});
			animate(elOpen!, {
				opacity: 0,
				rotate: -180,
				duration: 200
			});
			animate(elMenu!, {
				opacity: 1,
				rotate: 0,
				duration: 200
			});
		}
	};

	createEffect(() => {
		if (!elMenu || !elOpen) return;
		if (!initialized()) {
			initializeStyle();
		}
		if (initialized() && lastExpanded() != props.expanded) {
			playAnimation();
			setLastExpanded(props.expanded || false);
		}
		setInitialized(true);
	});

	return (
		<IconButton class={v.class} {...rest}>
			<MenuOpen class="absolute" style="opacity: 0" ref={elOpen} />
			<Menu class="absolute" style="opacity: 0" ref={elMenu} />
		</IconButton>
	);
};
