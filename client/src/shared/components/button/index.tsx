import React from "react";

import cn from "classnames";

import styles from "./index.module.scss";
import { ButtonProps } from "./types";

export const Button: React.FC<ButtonProps> = ({
    testId,
    children,
    className,
    wide,
    ...props
}) => {
    const composedClass = cn(styles.button, className, {
        [styles.wideButton]: wide,
    });

    return (
        <button className={composedClass} data-testid={testId} {...props}>
            {children}
        </button>
    );
};
