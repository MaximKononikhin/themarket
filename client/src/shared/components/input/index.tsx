import React, { forwardRef } from "react";

import cn from "classnames";

import { Typography } from "@shared/components";
import { useAutosizeTextArea } from "@shared/lib/use-autosize-textarea";
import { useForwardRef } from "@shared/lib/use-forward-ref";

import styles from "./index.module.scss";
import { InputProps } from "./types";

export const Input = forwardRef<
    HTMLInputElement | HTMLTextAreaElement,
    InputProps
>((props, forwardedRef) => {
    const {
        value,
        onChange,
        width = "normal",
        label,
        placeholder,
        error,
        errorType = "absolute",
        labelStyle = "text-2",
        className,
        testId,
        design = "input",
        ...rest
    } = props;

    const ref = useForwardRef<HTMLInputElement | HTMLTextAreaElement>(
        forwardedRef
    );

    const elementProps = { value, onChange, placeholder, ...rest };

    if (design === "textarea" && typeof value === "string") {
        useAutosizeTextArea(ref.current as HTMLTextAreaElement, value);
    }

    const labelContent =
        typeof label === "string" ? (
            <Typography type={labelStyle}>{label}</Typography>
        ) : (
            label
        );

    const inputStyles = cn(className, {
        [styles.input]: true,
        [styles.input__common_invalid]: error,
        [styles.input__common_wide]: width === "wide",
        [styles.input__common_small]: width === "small",
    });

    const textAreaStyles = cn({
        [styles.textarea]: true,
        [styles.input__common_invalid]: error,
        [styles.input__common_wide]: width === "wide",
        [styles.input__common_small]: width === "small",
    });

    const labelStyles = cn({
        [styles.label]: true,
        [styles.label__wide]: width === "wide",
    });

    const wrapperStyles = cn({
        [styles.wrapper]: true,
        [styles.wrapper__wide]: width === "wide",
    });

    const errorStyles = cn({
        [styles.error__absolute]: errorType === "absolute",
        [styles.error__static]: errorType === "static",
    });

    const input = (
        <input
            ref={ref as React.LegacyRef<HTMLInputElement>}
            data-testid={testId}
            className={inputStyles}
            {...elementProps}
        />
    );

    const content =
        design === "input" ? (
            <>{input}</>
        ) : (
            <textarea
                ref={ref as React.LegacyRef<HTMLTextAreaElement>}
                className={textAreaStyles}
                {...elementProps}
            />
        );

    return (
        <div className={wrapperStyles}>
            <label className={labelStyles}>
                {labelContent}
                {content}
            </label>
            {error && <span className={errorStyles}>{error}</span>}
        </div>
    );
});

Input.displayName = "Input";
