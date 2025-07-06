import { Component, JSX } from "solid-js";
import { getClass } from "@utils/getClass";
import { tv } from "tailwind-variants";

export interface CardMediaProps extends JSX.HTMLAttributes<HTMLImageElement> {
	alt?: string;
	round: boolean;
}

export const CardMedia: Component<CardMediaProps> = ({ round = false, alt, ...props }) => {
	const [className, restWithoutClass] = getClass(props);
	const style = tv({
		base: "w-full bg-cover object-cover p-0",
		variants: {
			round: {
				true: "rounded-b-2xl"
			}
		}
	});
	return <img class={style({ className, round })} alt={alt} {...restWithoutClass} />;
};
