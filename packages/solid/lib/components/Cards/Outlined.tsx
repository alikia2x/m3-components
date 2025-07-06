import { CardProps } from "./index";
import { tv } from "tailwind-variants";
import { getClass } from "@utils/getClass";

export function OutlinedCard({ variant, children, ...props }: CardProps) {
    const [className, restWithoutClass] = getClass(props);

    const styles = tv({
        base: "relative bg-surface outline-1 outline-outline-variant rounded-xl overflow-clip",
    });
    
    return (
        <div class={styles({ className })} {...restWithoutClass}>
            {children}
        </div>
    )
}