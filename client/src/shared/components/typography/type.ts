import { ReactNode } from "react";

export const TYPOGRAPHY = [
    "header-1",
    "header-2",
    "text-1",
    "text-1-medium",
    "text-2",
    "text-2-medium",
    "text-3",
] as const;

export type Type = (typeof TYPOGRAPHY)[number];

export type TypographyProps = {
    /** Название стилей по макету ***/
    type: Type;
    /** Потом ***/
    children: ReactNode;
    /** Доп.Стили ***/
    className?: string;
    /** test **/
    testId?: string;
};
