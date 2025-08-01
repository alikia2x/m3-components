import { splitProps, type Component, type JSX } from "solid-js";
import { tv } from "tailwind-variants";

export const Desktop: Component<JSX.HTMLAttributes<HTMLDivElement>> = (props) => {
	const [v, rest] = splitProps(props, ["class"]);
	const style = tv({
		base: "relative w-full overflow-y-scroll [scrollbar-width:none] [&::-webkit-scrollbar]:hidden translate-y-0 h-80"
	});
	return (
		<div class={style({ class: v.class })} {...rest}>
			{rest.children}
		</div>
	);
};
