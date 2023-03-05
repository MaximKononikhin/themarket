import React from "react";

import cn from "classnames";

import styles from "./index.module.scss";
import { TypographyProps } from "./type";

export const Typography: React.FC<TypographyProps> = ({
    className,
    type,
    children,
    testId,
}) => {
    /* Заголовки */
    if (type === "header-1") {
        const headingStyles = cn(className, {
            [styles.heading1]: type === "header-1",
        });

        return (
            <h1 data-testid={testId} className={headingStyles}>
                {children}
            </h1>
        );
    }

    if (type === "header-2") {
        const headingStyles = cn(className, {
            [styles.heading2]: type === "header-2",
        });

        return (
            <h2 data-testid={testId} className={headingStyles}>
                {children}
            </h2>
        );
    }

    /* Текстовые элементы (по умолчанию - параграфы) */
    const textStyles = cn(className, {
        [styles.paragraphOne]: type === "text-1",
        [styles.textOneMedium]: type === "text-1-medium",
        [styles.textSecond]: type === "text-2",
        [styles.textThird]: type === "text-3",
        [styles.textTwoMedium]: type === "text-2-medium",
        [styles.textError]: type === "error",
    });

    return (
        <p data-testid={testId} className={textStyles}>
            {children}
        </p>
    );
};
