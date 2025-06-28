import type { Component } from "solid-js";
import {
	AppBar,
	AppBarSearchBox,
	IconButton,
	LeadingElement,
	TrailingElementGroup,
	TrailingElement
} from "@m3-components/solid";

export const AppBarDemo: Component = () => {
	return (
		<div class="w-full h-64">
			<div class="flex justify-between h-16 py-4 px-6">
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
						<path
							fill="currentColor"
							d="M7 9v11.67C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V9z"
						/>
					</svg>
				</div>
			</div>
			<AppBar variant="search" scrolling={false}>
				<LeadingElement class="text-2xl">
					<IconButton>
						<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
							<path
								fill="currentColor"
								d="M4 18q-.425 0-.712-.288T3 17t.288-.712T4 16h16q.425 0 .713.288T21 17t-.288.713T20 18zm0-5q-.425 0-.712-.288T3 12t.288-.712T4 11h16q.425 0 .713.288T21 12t-.288.713T20 13zm0-5q-.425 0-.712-.288T3 7t.288-.712T4 6h16q.425 0 .713.288T21 7t-.288.713T20 8z"
							/>
						</svg>
					</IconButton>
				</LeadingElement>
				<AppBarSearchBox placeholder="Search" />
				<TrailingElementGroup>
					<TrailingElement>
						<IconButton>
							<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
								<path
									fill="currentColor"
									d="M5.85 17.1q1.275-.975 2.85-1.537T12 15t3.3.563t2.85 1.537q.875-1.025 1.363-2.325T20 12q0-3.325-2.337-5.663T12 4T6.337 6.338T4 12q0 1.475.488 2.775T5.85 17.1M12 13q-1.475 0-2.488-1.012T8.5 9.5t1.013-2.488T12 6t2.488 1.013T15.5 9.5t-1.012 2.488T12 13m0 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
								/>
							</svg>
						</IconButton>
					</TrailingElement>
				</TrailingElementGroup>
			</AppBar>
		</div>
	);
};
