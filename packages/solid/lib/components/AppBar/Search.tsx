import { Component, JSX } from "solid-js";
import { AppBarConfigExpressive } from "./index";
import { tv } from "tailwind-variants";

export const AppBarSearchBox: Component<JSX.InputHTMLAttributes<HTMLInputElement>> = ({ ...rest }) => {
    const style = tv({
        base: "bg-surface-container-high h-14 grow rounded-full px-6 focus:outline-secondary\
        focus:outline-[3px] focus:outline-offset-2"
    });
    return (
        <input
            class={style({})}
            {...rest}
        />
    );
};

export const SearchAppBar: Component<AppBarConfigExpressive> = ({ children, ...rest }) => {
    return (
        <header class="bg-surface sticky w-full h-16 top-0 flex justify-between items-center" {...rest}>
            {children}
        </header>
    );
};
