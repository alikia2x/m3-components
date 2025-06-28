import { JSX } from "solid-js";

function removeAttr<T extends object, K extends keyof T>(obj: T, attr: K): Omit<T, K> {
    const { [attr]: _, ...rest } = obj;
    return rest as Omit<T, K>;
}

/**
 * Extracts the 'className' property from a JSX props object and returns it along with
 * the rest of the props (without 'className'). This is useful for passing
 * remaining props down to child components or HTML elements.
 *
 * @template P The type of the input props object, which should extend JSX.HTMLAttributes<HTMLElement>.
 * @param props The props object, potentially containing a 'className' property.
 * @returns A tuple where the first element is the 'className' (or undefined if not present)
 * and the second element is the rest of the props without 'className'.
 */
export function getClass<P extends {class?: string | undefined}>(
    props: P
): [string | undefined, Omit<P, 'class'>] {
    const className = props.class as string || "";

    const restWithoutClass = removeAttr(props, 'class' as keyof P);

    return [className, restWithoutClass as Omit<P, 'class'>];
}