import React, { PropsWithChildren, useEffect, useRef, useState } from "react";

import cn from "classnames";

import CloseIcon from "@shared/assets/icons/close.svg?sprite";
import { useOnClickOutside } from "@shared/hooks";

import styles from "./index.module.scss";
import { ModalProps } from "./types";

export const Modal: React.FC<PropsWithChildren<ModalProps>> = ({
    children,
    onClose,
    isOpen,
    className,
}) => {
    const [isAnimating, setAnimating] = useState(false);

    const handleCLose = () => {
        setAnimating(true);
        setTimeout(() => {
            onClose();
        }, 450);
    };

    const ref = useRef<HTMLDivElement>(null);

    useOnClickOutside(ref, handleCLose);

    const classNames = cn(styles.container, className, {
        [styles.container_closing]: isAnimating,
    });

    useEffect(() => {
        if (!isOpen) {
            setAnimating(false);
        }
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    return (
        <div className={styles.overlay}>
            <div ref={ref} className={classNames}>
                <CloseIcon className={styles.closeIcon} onClick={handleCLose} />
                {children}
            </div>
        </div>
    );
};
