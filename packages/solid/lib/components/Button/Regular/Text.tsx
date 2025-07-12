import { Component } from "solid-js";
import { ButtonProps, getShapeClasses, getSizeClasses } from "./index";
import { useRipple } from "@utils/useRipple";
import { getClass } from "@utils/getClass";

export const TextButton: Component<ButtonProps> = ({
    children,
    size = "small",
    shape = "round",
    disabled,
    ref,
    ripple = true,
    ...rest
}) => {
    const sizeClasses = getSizeClasses(size);
    const shapeClasses = getShapeClasses(shape, size);
    const [className, restWithoutClass] = getClass(rest);

    const { onMouseDown } = useRipple({ ripple: ripple ?? true });

    return (
        <button
            class={`text-primary dark:text-dark-primary duration-150 select-none
				flex items-center justify-center relative overflow-hidden
				disabled:text-on-surface/40 disabled:dark:text-dark-on-surface/40
				${sizeClasses} ${shapeClasses} ${className}`}
            {...restWithoutClass}
            disabled={disabled}
            ref={ref as unknown as (el: HTMLButtonElement) => void}
        >
            <div
                class={`absolute w-full h-full enabled:hover:bg-primary/10 enabled:dark:hover:bg-dark-primary/10
				${disabled ? "bg-on-surface/10 dark:bg-dark-on-surface/10" : ""}
				left-0 top-0`}
                onMouseDown={onMouseDown}
            ></div>
            {children}
        </button>
    );
};
