import { Headline } from "./Headline";
import { Body } from "./Body";

interface Typography {
	Headline: typeof Headline;
	Body: typeof Body;
}

export const Typography: Typography = {} as Typography;

Typography.Headline = Headline;
Typography.Body = Body;
