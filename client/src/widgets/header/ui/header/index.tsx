import React from "react";

import { Link } from "atomic-router-react";

import { authModalModel } from "@features/auth-modal";
import { userModel } from "@entities/user";
import Logo from "@shared/assets/icons/logo.svg?sprite";
import { Button, Group, Input, Typography } from "@shared/components";
import { ROUTES_MAP } from "@shared/lib";

import { Profile } from "../profile";
import styles from "./index.module.scss";

export const Header = () => {
    const user = userModel.selectors.useUser();

    const handleSignInButton = () => {
        authModalModel.events.openAuthModal();
    };

    const content = user ? (
        <Profile user={user} />
    ) : (
        <button className={styles.header__btn} onClick={handleSignInButton}>
            <Typography type="text-2">Войти</Typography>
        </button>
    );

    return (
        <header className={styles.header}>
            <Group
                width="1160px"
                direction="row"
                alignItems="center"
                className={styles.header__wrapper}
            >
                <Group direction="row" alignItems="center" gap={20}>
                    <Link to={ROUTES_MAP.home}>
                        <Logo className={styles.header__logo} />
                    </Link>
                    <Group direction="row" alignItems="center" gap={20}>
                        <Input placeholder="Поиск" />
                        <Group direction="row" gap={20} alignItems="center">
                            <Typography type="text-2">Мужское</Typography>
                            <Typography type="text-2">Женское</Typography>
                        </Group>
                    </Group>
                </Group>
                <Group
                    direction="row"
                    alignItems="center"
                    gap={20}
                    className={styles.header__profile}
                >
                    <Link to={ROUTES_MAP.newProduct}>
                        <Button>Продать</Button>
                    </Link>
                    {content}
                </Group>
            </Group>
        </header>
    );
};
