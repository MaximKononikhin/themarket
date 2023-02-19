import React from "react";

import cn from "classnames";

import styles from "./index.module.scss";
import { ButtonProps } from "./types";

const Button: React.FC<ButtonProps> = ({
    testId,
    children,
    className,
    ...props
}) => {
    const composedClass = cn(styles.button, className);

    return (
        <button className={composedClass} data-testid={testId} {...props}>
            {children}
        </button>
    );
};

export default Button;
