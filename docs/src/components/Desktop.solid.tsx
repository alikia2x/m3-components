import { type Component, type JSX } from "solid-js";

export const Desktop: Component<JSX.HTMLAttributes<HTMLDivElement>> = ({ children }) => {
	return (
		<div class="relative w-full h-80 overflow-y-scroll [scrollbar-width:none] [&::-webkit-scrollbar]:hidden translate-y-0">
			{children}
		</div>
	);
};
