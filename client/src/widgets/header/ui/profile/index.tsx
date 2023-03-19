import React from "react";

import { Link } from "atomic-router-react";

import { userModel } from "@entities/user";
import UserIcon from "@shared/assets/icons/profile.svg?sprite";
import { Group, Typography } from "@shared/components";

import { USER_MENU_LINKS } from "../../lib/constants";
import styles from "./index.module.scss";
import { ProfileProps } from "./types";

export const Profile: React.FC<ProfileProps> = ({ user }) => {
    const content = user.avatar ? (
        <img className={styles.avatar} src={user.avatar} alt={user.name} />
    ) : (
        <UserIcon width="25" height="25" />
    );

    const userMenuContent = USER_MENU_LINKS.map((item) => (
        <Group
            alignItems="center"
            width="100%"
            key={item.title}
            className={styles.user__menuItem}
        >
            <Link
                to={item.link.route}
                query={item.link.query}
                className={styles.user__menuBtn}
            >
                <Typography type="text-2">{item.title}</Typography>
            </Link>
        </Group>
    ));

    const handleBtnClick = () => userModel.events.logout();

    return (
        <Group gap={20} className={styles.container}>
            <Typography type="text-2">Сообщения</Typography>
            <Group className={styles.user}>
                {content}
                <ul className={styles.user__menu}>
                    {userMenuContent}
                    <li className={styles.user__menuItem}>
                        <button
                            className={styles.user__menuBtn}
                            onClick={handleBtnClick}
                        >
                            <Typography type="text-2">Выйти</Typography>
                        </button>
                    </li>
                </ul>
            </Group>
        </Group>
    );
};
