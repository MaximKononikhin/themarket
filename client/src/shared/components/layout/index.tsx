import React, { PropsWithChildren } from "react";

import styles from "./index.module.scss";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => (
    <main className={styles.main}>{children}</main>
);
