import { Component, JSX } from "solid-js";
import { Headline } from "./Headline";
import { Body } from "./Body";

interface Typography {
	Headline: Component<JSX.HTMLAttributes<HTMLDivElement>>;
	Body: Component<JSX.HTMLAttributes<HTMLParagraphElement>>;
}

export const Typography: Typography = {} as Typography;

Typography.Headline = Headline;
Typography.Body = Body;
