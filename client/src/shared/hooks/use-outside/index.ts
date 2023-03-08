import { RefObject, useEffect } from "react";

export type TEvent = MouseEvent | TouchEvent;

export const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
    ref: RefObject<T>,
    handler: (event: TEvent) => void
): void => {
    useEffect(() => {
        const listener = (event: TEvent): void => {
            const element = ref?.current;

            if (!element || element.contains(event.target as Node)) {
                return;
            }

            handler(event);
        };

        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler]);
};
