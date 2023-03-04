import { InputHTMLAttributes, ReactNode } from "react";

import { Type } from "components/typography/types";

export interface InputProps
    extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
    /** Тип инпута **/
    type?: "input" | "textarea";
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
    /** Иконка соц-сети **/
    iconName?: "vk" | "viber" | "tg" | "link";
    /** labelStyle **/
    labelStyle?: Extract<Type, "header-1" | "header-2">;
    /** стилизация **/
    className?: string;
    /** тест-айди **/
    testId?: string;
}
