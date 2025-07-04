import { Component, JSX } from "solid-js";
import { useRipple } from "@utils/useRipple";
import { getClass } from "@utils/getClass";
import { tv } from "tailwind-variants";

export interface IconButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: JSX.Element;
    ripple?: boolean;
}

export const IconButton: Component<IconButtonProps> = ({
    children,
    disabled,
    ref,
    ripple = true,
    ...rest
}) => {
    const { onMouseDown } = useRipple({ ripple: ripple ?? true });
    const [className, restWithoutClass] = getClass(rest);

    const buttonStyles = tv({
        base: "duration-150 h-10 w-10 text-2xl select-none flex rounded-full \
        items-center justify-center relative overflow-hidden disabled:text-on-surface/40\
        disabled:dark:text-dark-on-surface/40",
    });
    const stateLayerStyles = tv({
        base: "absolute w-full h-full enabled:hover:bg-primary/10 enabled:dark:hover:bg-dark-primary/10 left-10 top-0",
        variants: {
            disabled: {
                true: "bg-on-surface/10 dark:bg-dark-on-surface/10",
            },
        },
    });

    return (
        <button
            class={buttonStyles({ className })}
            {...restWithoutClass}
            onMouseDown={onMouseDown}
            disabled={disabled}
            ref={ref as unknown as (el: HTMLButtonElement) => void}
        >
            <div class={stateLayerStyles({ disabled: disabled })}></div>
            {children}
        </button>
    );
};
