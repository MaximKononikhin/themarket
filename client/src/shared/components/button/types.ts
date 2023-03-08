import { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** Контент кнопки **/
    children?: ReactNode;
    /** id **/
    testId?: string;
    className?: string;
    wide?: boolean;
}
