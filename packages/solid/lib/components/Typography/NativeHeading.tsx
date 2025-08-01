import { Component, JSX } from "solid-js";

export type TitleLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | 1 | 2 | 3 | 4 | 5 | 6;

interface NativeHeadingProps extends JSX.HTMLAttributes<HTMLHeadingElement> {
	level: TitleLevel;
}

export const NativeHeading: Component<NativeHeadingProps> = ({ level, ...props }) => {
	switch (level) {
		case "h1":
		case 1:
			return <h1 {...props} />;
		case "h2":
		case 2:
			return <h2 {...props} />;
		case "h3":
		case 3:
			return <h3 {...props} />;
		case "h4":
		case 4:
			return <h4 {...props} />;
		case "h5":
		case 5:
			return <h5 {...props} />;
		case "h6":
		case 6:
			return <h6 {...props} />;
		default:
			return <h1 {...props} />;
	}
};
