import { JSX } from "solid-js";
import { OutlinedCard } from "./Outlined";
import { CardMedia } from "./CardMedia";
import { CardContent } from "./CardContent";
import { CardActionArea } from "./CardActionArea";

export interface CardProps extends JSX.HTMLAttributes<HTMLDivElement> {
	variant?: "outlined" | "filled" | "elevated";
	clickable?: boolean;
}

export function Card(props: CardProps) {
	switch (props.variant) {
		default:
			return <OutlinedCard {...props} />;
	}
}

export { CardMedia, CardContent, CardActionArea };
