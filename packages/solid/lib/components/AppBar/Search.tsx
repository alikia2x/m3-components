import { Accessor, Component, createEffect, JSX, onMount, useContext } from "solid-js";
import { AppBarConfigExpressive } from "./index";
import { tv } from "tailwind-variants";
import { getClass } from "@utils/getClass";
import { createContext } from "solid-js";

const AppBarRefContext = createContext();

interface AppBarSearchBoxProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
    scrolling?: Accessor<boolean>;
}

export const AppBarSearchBox: Component<AppBarSearchBoxProps> = ({ scrolling, ...rest }) => {
    const ref = useContext(AppBarRefContext);
    createEffect(() => {
        console.log(ref);
    });
    onMount(() => {
        console.log("??/");
    });

    const style = tv({
        base: "bg-surface-container-high h-14 w-[max(50%,min(100%,312px))] rounded-full px-6 focus:outline-secondary\
        focus:outline-[3px] focus:outline-offset-2",
        variants: {
            scrolling: {
                true: "bg-surface-container-lowest",
            },
        },
    });
    return (
        <div class="grow flex justify-center">
            <input class={style({ scrolling: scrolling?.() })} {...rest} />
        </div>
    );
};

export const SearchAppBar: Component<AppBarConfigExpressive> = ({ children, scrolling, ...rest }) => {
    let headerRef;
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
        <AppBarRefContext.Provider value={headerRef}>
            <header class={style({ className, scrolling: scrolling?.() })} {...restWithoutClass} ref={headerRef}>
                {children}
            </header>
        </AppBarRefContext.Provider>
    );
};
