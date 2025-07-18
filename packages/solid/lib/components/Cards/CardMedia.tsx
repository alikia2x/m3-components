import { Component, JSX } from "solid-js";
import { getRestProps } from "@utils/getClass";
import { tv } from "tailwind-variants";

export interface CardMediaProps extends JSX.HTMLAttributes<HTMLImageElement> {
	alt?: string;
	round: boolean;
}

export const CardMedia: Component<CardMediaProps> = (props) => {
	const rest = getRestProps(props, ["class", "round", "alt"]);
	const style = tv({
		base: "w-full bg-cover object-cover p-0",
		variants: {
			round: {
				true: "rounded-b-2xl"
			}
		}
	});
	return <img class={style({ class: props.class, round: props.round })} alt={props.alt} {...rest} />;
};
