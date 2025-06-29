import { getClass } from "@m3-components/solid";
import { type Accessor, type Component, type JSX } from "solid-js";
import { tv } from "tailwind-variants";

interface PhoneProps extends JSX.HTMLAttributes<HTMLDivElement> {
	scrolling?: Accessor<boolean>;
}

export const PhoneStatusBar: Component<PhoneProps> = ({ scrolling, children, ...rest }) => {
	const [className, restWithoutClass] = getClass(rest);
	const style = tv({
		base: "flex justify-between h-16 py-4 px-6 sticky top-0 bg-background duration-150",
		variants: {
			scrolling: {
				true: "bg-surface-container"
			}
		}
	});

	return (
		<div class={style({ className, scrolling: scrolling?.() })} {...restWithoutClass}>
			<div>9:41</div>
			<div class="text-lg flex">
				<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
					<path
						fill="currentColor"
						d="M12.01 21.49L23.64 7c-.45-.34-4.93-4-11.64-4C5.28 3 .81 6.66.36 7l11.63 14.49l.01.01z"
					/>
				</svg>
				<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
					<path
						fill="currentColor"
						fill-opacity="0.3"
						d="M17 5.33C17 4.6 16.4 4 15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33V9h10z"
					/>
					<path fill="currentColor" d="M7 9v11.67C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V9z" />
				</svg>
			</div>
		</div>
	);
};

export const Phone: Component<JSX.HTMLAttributes<HTMLDivElement>> = ({ children, ref }) => {
	return (
		<div
			class="relative w-full h-80 overflow-y-scroll [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
			ref={ref}
		>
			{children}
		</div>
	);
};
