import { Headline } from "./Headline";
import { Body } from "./Body";
import { Display } from "./Display";
import { Title } from "./Title";
import { Label } from "./Label";

interface Typography {
	Display: typeof Display;
	Headline: typeof Headline;
	Title: typeof Title;
	Body: typeof Body;
	Label: typeof Label;
}

export const Typography: Typography = {} as Typography;

Typography.Display = Display;
Typography.Headline = Headline;
Typography.Body = Body;
Typography.Title = Title;
Typography.Label = Label;