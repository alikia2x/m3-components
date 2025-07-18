import { CardProps } from "./index";
import { tv } from "tailwind-variants";
import { getRestProps } from "@utils/getClass";
import { Component } from "solid-js";

export const OutlinedCard: Component<CardProps> = (props)=> {
    const rest = getRestProps(props, ["class", "variant"]);

    const styles = tv({
        base: "relative bg-surface outline-1 outline-outline-variant rounded-xl overflow-clip",
    });
    
    return (
        <div class={styles({ class: props.class })} {...rest}>
            {props.children}
        </div>
    )
}