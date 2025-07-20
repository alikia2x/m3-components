import { createEffect, createSignal, type Component } from "solid-js";
import { createScrollPosition } from "@solid-primitives/scroll";
import {
	AppBar,
	AppBarSearchBox,
	IconButton,
	LeadingElement,
	TrailingElementGroup,
	TrailingElement
} from "@m3-components/solid";
import { Phone, PhoneStatusBar } from "./Phone.solid.tsx";

const MenuIcon: Component = () => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
			<path
				fill="currentColor"
				d="M4 18q-.425 0-.712-.288T3 17t.288-.712T4 16h16q.425 0 .713.288T21 17t-.288.713T20 18zm0-5q-.425 0-.712-.288T3 12t.288-.712T4 11h16q.425 0 .713.288T21 12t-.288.713T20 13zm0-5q-.425 0-.712-.288T3 7t.288-.712T4 6h16q.425 0 .713.288T21 7t-.288.713T20 8z"
			/>
		</svg>
	);
};

const UserIcon: Component = () => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
			<path
				fill="currentColor"
				d="M5.85 17.1q1.275-.975 2.85-1.537T12 15t3.3.563t2.85 1.537q.875-1.025 1.363-2.325T20 12q0-3.325-2.337-5.663T12 4T6.337 6.338T4 12q0 1.475.488 2.775T5.85 17.1M12 13q-1.475 0-2.488-1.012T8.5 9.5t1.013-2.488T12 6t2.488 1.013T15.5 9.5t-1.012 2.488T12 13m0 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
			/>
		</svg>
	);
};

export const AppBarDemo: Component = () => {
	let container;
	const [scrolling, setScrolling] = createSignal(false);
	const scroll = createScrollPosition(() => container);

	createEffect(() => {
		const currentPos = scroll.y;
		if (currentPos > 10) {
			setScrolling(true);
		} else {
			setScrolling(false);
		}
	});
	
	return (
		<Phone ref={container}>
			<PhoneStatusBar scrolling={scrolling()} />
			<AppBar variant="search" scrolling={scrolling()} class="top-16">
				<LeadingElement>
					<IconButton>
						<MenuIcon />
					</IconButton>
				</LeadingElement>
				<AppBarSearchBox placeholder="Search"/>
				<TrailingElementGroup>
					<TrailingElement>
						<IconButton>
							<UserIcon />
						</IconButton>
					</TrailingElement>
				</TrailingElementGroup>
			</AppBar>
			<div class="p-6">
				<h1 class="text-4xl font-light">Lorem ipsum</h1>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at mi vel tortor porta malesuada.
					Quisque sit amet massa et velit cursus suscipit nec ac ligula. Etiam mollis gravida leo, eu
					sollicitudin risus imperdiet ac. Quisque mollis lacinia dui, eget accumsan metus condimentum non.
					Fusce semper neque at nulla placerat molestie. Integer suscipit mi sapien, a placerat nisi ultricies
					vitae. Sed suscipit fringilla urna at tincidunt. Phasellus et quam erat. Ut sit amet magna leo.
					Nulla porttitor lorem eu lorem luctus convallis.
				</p>
				<p>
					Vivamus imperdiet magna ac est condimentum luctus in vitae purus. Nam vestibulum orci eu massa
					bibendum, nec vestibulum quam varius. Vestibulum non hendrerit mauris. Sed nec nulla magna. Ut
					luctus vestibulum sodales. Aliquam erat volutpat. Vestibulum ante ipsum primis in faucibus orci
					luctus et ultrices posuere cubilia curae; Nunc et quam mollis, pharetra odio vitae, efficitur
					tellus. Nulla fringilla sem quis est venenatis, eget faucibus diam varius. Nullam pulvinar orci quis
					orci porttitor euismod. Sed vulputate augue at faucibus ultrices. Mauris eu ante feugiat, aliquam
					lectus nec, cursus nisi. Duis pulvinar egestas ligula eu luctus.
				</p>
			</div>
		</Phone>
	);
};
