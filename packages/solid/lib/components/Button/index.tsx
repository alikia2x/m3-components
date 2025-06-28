import { Component, JSX } from "solid-js";
import { TextButton } from "./Text";
import { FilledButton } from "./Filled";

export type ButtonShape = "round" | "square";
export type ButtonSize = "xs" | "s" | "m" | "l" | "xl";

export interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
    size?: ButtonSize;
    shape?: ButtonShape;
    children?: JSX.Element;
    ripple?: boolean;
}

export const getShapeClasses = (shape: ButtonShape, size: ButtonSize) => {
    switch (size) {
        case "s":
        return shape === "round" ? "rounded-full" : "rounded-xl";
        default:
        return shape === "round" ? "rounded-full" : "rounded-2xl";
    } 
};

export const getSizeClasses = (size: ButtonSize) => {
    switch (size) {
        case "m":
            return "text-base leading-6 h-14 px-6";
        case "l":
            return "text-2xl h-24 px-12";
        default:
            return "text-sm leading-5 h-10 px-4";
    }
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

export { IconButton } from "./Icon";
