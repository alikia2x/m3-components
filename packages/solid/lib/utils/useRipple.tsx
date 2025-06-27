import { createSignal, createEffect, onCleanup } from "solid-js";

interface UseRippleOptions {
    ripple?: boolean;
}

export const useRipple = (options: UseRippleOptions = {}) => {
    const { ripple = true } = options;

    const createRippleEffect = (event: MouseEvent | TouchEvent) => {
        const target = event.currentTarget as HTMLElement;
        if (!target) return;

        const rect = target.getBoundingClientRect();

        let x = 0;
        let y = 0;

        if ("touches" in event) {
            x = event.touches[0].clientX - rect.left;
            y = event.touches[0].clientY - rect.top;
        } else {
            x = event.clientX - rect.left;
            y = event.clientY - rect.top;
        }

        const diameter = Math.max(rect.width, rect.height);
        const rippleElement = document.createElement("span");

        rippleElement.style.width = `${diameter}px`;
        rippleElement.style.height = `${diameter}px`;
        rippleElement.style.left = `${x - diameter / 2}px`;
        rippleElement.style.top = `${y - diameter / 2}px`;
        rippleElement.classList.add("m3-ripple");

        target.appendChild(rippleElement);

        const handleAnimationEnd = () => {
            rippleElement.remove();
            rippleElement.removeEventListener("animationend", handleAnimationEnd);
        };

        rippleElement.addEventListener("animationend", handleAnimationEnd);
    };

    const handleMouseDown = (event: MouseEvent) => {
        if (!ripple) return;
        createRippleEffect(event);
    };

    const handleTouchStart = (event: TouchEvent) => {
        if (!ripple) return;
        createRippleEffect(event);
    };

    return {
        onMouseDown: ripple ? handleMouseDown : undefined,
    };
};