import { InputHTMLAttributes, ReactNode } from "react";

import { Type } from "../typography/type";

export interface InputProps
    extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
    /** Тип инпута **/
    design?: "input" | "textarea";
    /** Ширина инпута **/
    width?: "wide" | "normal" | "small";
    /** Лейбл **/
    label?: string | ReactNode;
    /** Плейсхолдер **/
    placeholder?: string;
    /** Текст ошибки **/
    error?: string;
    /** Тип ошибки **/
    errorType?: "absolute" | "static";
    /** labelStyle **/
    labelStyle?: Extract<Type, "header-1" | "header-2">;
    /** стилизация **/
    className?: string;
    /** тест-айди **/
    testId?: string;
}
