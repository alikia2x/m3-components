import { Component } from "solid-js";
import { ButtonProps, getShapeClasses, getSizeClasses } from "./index";
import { useRipple } from "@utils/useRipple";
import { getClass } from "@utils/getClass";

export const FilledButton: Component<ButtonProps> = ({
	children,
	size = "s",
	shape = "round",
	ripple = true,
	...rest
}) => {
	const sizeClasses = getSizeClasses(size);
	const shapeClasses = getShapeClasses(shape, size);
	const [className, restWithoutClass] = getClass(rest);

	const { onMouseDown } = useRipple({ ripple: ripple ?? true });

	return (
		<button
			class={`bg-primary text-on-primary duration-150 select-none
                flex items-center justify-center relative overflow-hidden
                ${sizeClasses} ${shapeClasses} ${className}`}
			{...restWithoutClass}
		>
			<div class="absolute w-full h-full hover:bg-on-surface-variant/10" onMouseDown={onMouseDown}></div>
			{children}
		</button>
	);
};
