import { Component, JSX } from "solid-js";
import { useRipple } from "../../utils/useRipple"; // Assuming useRipple is compatible or a SolidJS version exists

interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
    size?: "xs" | "s" | "m" | "l" | "xl";
    shape?: "round" | "square";
    children?: JSX.Element;
    ripple?: boolean;
}

const FilledButton: Component<ButtonProps> = ({
    children,
    size = "s",
    shape = "round",
    ripple = true,
    ...rest
}) => {
    let sizeClasses = "text-sm leading-5 h-10 px-4";
    let shapeClasses = shape === "round" ? "rounded-full" : "rounded-xl";

    if (size === "m") {
        sizeClasses = "text-base leading-6 h-14 px-6";
        shapeClasses = shape === "round" ? "rounded-full" : "rounded-2xl";
    }
    else if (size === "l") {
        sizeClasses = "text-2xl h-24 px-12";
        shapeClasses = shape === "round" ? "rounded-full" : "rounded-2xl";
    }

    // Assuming useRipple is a SolidJS compatible hook or a SolidJS version is implemented
    const { onMouseDown } = useRipple({ ripple: ripple ?? true });

    return (
        <button
            class={`bg-primary dark:bg-dark-primary text-on-primary dark:text-dark-on-primary duration-150 select-none
				flex items-center justify-center relative overflow-hidden
				${sizeClasses} ${shapeClasses} ${rest.class ?? ""}`}
            {...rest}
            onMouseDown={onMouseDown}
        >
            <div class="absolute w-full h-full hover:bg-on-surface-variant/10"></div>
            {children}
        </button>
    );
};

const TextButton: Component<ButtonProps> = ({
    children,
    size = "s",
    shape = "round",
    disabled,
    ref,
    ripple = true,
    ...rest
}) => {
    let sizeClasses = "text-sm leading-5 h-10 px-4";
    let shapeClasses = "rounded-full";

    if (size === "m") {
        sizeClasses = "text-base leading-6 h-14 px-6";
        shapeClasses = shape === "round" ? "rounded-full" : "rounded-2xl";
    }

    const { onMouseDown } = useRipple({ ripple: ripple ?? true });

    return (
        <button
            class={`text-primary dark:text-dark-primary duration-150 select-none
				flex items-center justify-center relative overflow-hidden
				disabled:text-on-surface/40 disabled:dark:text-dark-on-surface/40
				${sizeClasses} ${shapeClasses} ${rest.class ?? ""}`}
            {...rest}
            onMouseDown={onMouseDown}
            disabled={disabled}
            ref={ref as unknown as (el: HTMLButtonElement) => void}
        >
            <div
                class={`absolute w-full h-full enabled:hover:bg-primary/10 enabled:dark:hover:bg-dark-primary/10
				${disabled ? "bg-on-surface/10 dark:bg-dark-on-surface/10" : ""}
				left-0 top-0`}
            ></div>
            {children}
        </button>
    );
};

interface ButtonRootProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: JSX.Element;
    variant?: "text" | "filled";
    size?: "xs" | "s" | "m" | "l" | "xl";
    shape?: "round" | "square";
    ripple?: boolean;
}

export const Button: Component<ButtonRootProps> = (props) => {
    switch (props.variant) {
        case "text":
            return <TextButton {...props}>{props.children}</TextButton>;
        case "filled":
            return <FilledButton {...props}>{props.children}</FilledButton>;
        default:
            return <FilledButton {...props}>{props.children}</FilledButton>;
    }
};