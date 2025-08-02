import { Component, JSX, splitProps } from "solid-js";
import { tv } from "tailwind-variants";

export interface CardMediaProps extends JSX.ImgHTMLAttributes<HTMLImageElement> {
	alt?: string;
	round?: boolean;
}

export const CardMedia: Component<CardMediaProps> = (props) => {
	const [v, rest] = splitProps(props, ["class", "round", "alt"]);
	const style = tv({
		base: "w-full bg-cover object-cover p-0",
		variants: {
			round: {
				true: "rounded-b-2xl"
			}
		},
		defaultVariants: {
			round: false
		}
	});
	return <img class={style({ class: v.class, round: v.round })} alt={v.alt} {...rest} />;
};
