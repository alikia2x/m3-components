import {
	AppBar,
	AppBarSearchBox,
	IconButton,
	AppBarLeadingElement,
	AppBarTrailingElementGroup,
	AppBarTrailingElement,
	AppBarSearchContainer
} from "@m3-components/solid";
import { GitHub } from "@components/icons/GitHub.solid.js";
import { type Component, createSignal, type JSX, onCleanup, onMount } from "solid-js";

export const TopAppBar: Component<JSX.HTMLAttributes<HTMLElement>> = () => {
	const [scrolling, setScrolling] = createSignal(false);

	const handleScroll = () => {
		const currentPos = window.scrollY;
		if (currentPos > 10) {
			setScrolling(true);
		} else {
			setScrolling(false);
		}
	};

	onMount(() => {
		if (typeof window === "undefined") return;
		window.addEventListener("scroll", handleScroll);
	});

	onCleanup(() => {
		if (typeof window === "undefined") return;
		window.removeEventListener("scroll", handleScroll);
	});

	return (
		<AppBar variant="search" scrolling={scrolling()} class="fixed inset-x-0 top-0 z-20 px-2">
			<AppBarLeadingElement>
				<a href="/docs">
					<div class="rounded-full w-12 h-12 flex items-center justify-center bg-blue-200/50 dark:bg-blue-300">
						<span class="text-xl font-medium translate-x-[1.5px] text-blue-900">
							M<sup class="text-sm">3</sup>
						</span>
					</div>
				</a>
			</AppBarLeadingElement>
			<AppBarSearchContainer>
				<AppBarSearchBox placeholder="Search" />
			</AppBarSearchContainer>
			<AppBarTrailingElementGroup>
				<AppBarTrailingElement>
					<a href="https://github.com/alikia2x/m3-components">
						<IconButton class="font-2xl w-12 h-12 text-on-background">
							<GitHub />
						</IconButton>
					</a>
				</AppBarTrailingElement>
			</AppBarTrailingElementGroup>
		</AppBar>
	);
};
