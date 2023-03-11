import React, { PropsWithChildren } from "react";

import cn from "classnames";

import styles from "./index.module.scss";
import { GroupProps } from "./types";

export const Group: React.FC<PropsWithChildren<GroupProps>> = (props) => {
    const classNames = cn(props.className, {
        [styles.group]: true,
    });

    return (
        <div
            className={classNames}
            style={{
                gap: `${props.gap ?? 0}px`,
                alignItems: props.alignItems ?? "center",
                flexDirection: props.direction ?? "row",
                width: props.width ?? "fit-content",
                margin: props.margin || "",
            }}
            data-testid={props.testId}
        >
            {props.children}
        </div>
    );
};
