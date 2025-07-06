import { Accessor, Component, JSX } from "solid-js";
import { SearchAppBar } from "./Search";
import { tv } from "tailwind-variants";
import { getClass } from "@utils/getClass";

type AppBarTypesExpressive = "search" | "small" | "medium-flexible" | "large-flexible";
type AppBarTypesOriginalM3 = "small" | "center-aligned" | "medium" | "large";
type DivProps = JSX.HTMLAttributes<HTMLDivElement>;

interface AppBarCommonProps extends JSX.HTMLAttributes<HTMLElement> {
    scrolling?: Accessor<boolean>;
}

export interface AppBarConfigExpressive extends AppBarCommonProps {
    expressive?: true;
    variant?: AppBarTypesExpressive;
    alignment?: "leading-edge" | "center";
}

export interface AppBarConfigOriginalM3 extends AppBarCommonProps {
    expressive?: false;
    variant?: AppBarTypesOriginalM3;
}

export type AppBarProps = AppBarConfigExpressive | AppBarConfigOriginalM3;

export const LeadingElement: Component<DivProps> = ({ children, ...rest }) => {
    const [className, restWithoutClass] = getClass(rest);
    const styles = tv({
        base: "relative ml-1 mr-2 w-12 h-12 items-center justify-center flex",
    });
    return <div class={styles({ className })} {...restWithoutClass}>{children}</div>;
};

export const TrailingElementGroup: Component<{ children?: JSX.Element }> = ({ children }) => {
    return <div class="relative ml-2 mr-1 w-auto h-12 flex">{children}</div>;
};

export const TrailingElement: Component<{ children?: JSX.Element }> = ({ children }) => {
    return <div class="relative rounded-full w-12 h-12">{children}</div>;
};

export function AppBar({ ...props }: AppBarProps) {
    switch (props.variant) {
        case "search":
            return <SearchAppBar {...props} />;
        default:
            return <></>;
    }
}

export { AppBarSearchBox } from "./Search";
