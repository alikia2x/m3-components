import { Accessor, Component, JSX } from "solid-js";
import { AppBarProps } from "./index";
import { tv } from "tailwind-variants";
import { getClass } from "@utils/getClass";

interface AppBarSearchBoxProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
    scrolling?: Accessor<boolean>;
}

export const AppBarSearchBox: Component<AppBarSearchBoxProps> = ({ scrolling, ...rest }) => {
    const style = tv({
        base: "bg-surface-container-high h-14 w-[max(50%,min(100%,312px))] rounded-full px-6 focus:outline-secondary\
        focus:outline-[3px] focus:outline-offset-2 text-on-surface-variant",
        variants: {
            scrolling: {
                true: "bg-surface-container-lowest",
            },
        },
    });
    const [className, restWithoutClass] = getClass(rest);
    return (
        <div class="grow flex justify-center">
            <input class={style({ scrolling: scrolling?.(), className })} {...restWithoutClass} />
        </div>
    );
};

export const SearchAppBar: Component<AppBarProps> = ({ children, scrolling, ...rest }) => {
    const style = tv({
        base: "bg-surface sticky w-full h-16 top-0 flex justify-between items-center duration-150",
        variants: {
            scrolling: {
                true: "bg-surface-container",
            },
        },
    });
    const [className, restWithoutClass] = getClass(rest);
    return (
        <header class={style({ className, scrolling: scrolling?.() })} {...restWithoutClass}>
            {children}
        </header>
    );
};
