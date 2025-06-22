import { type JSX, type ParentComponent } from 'solid-js';

export const Button: ParentComponent<JSX.ButtonHTMLAttributes<HTMLButtonElement>> = ({children, ...rest}) => {
    return <button {...rest}>{children}</button>;
};
