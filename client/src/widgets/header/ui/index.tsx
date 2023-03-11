import React from "react";

import { authModalModel } from "@features/auth-modal";
import Logo from "@shared/assets/icons/logo.svg?sprite";
import { Button, Group, Input, Typography } from "@shared/components";

import styles from "./index.module.scss";

export const Header = () => {
    const handleSignInButton = () => {
        authModalModel.events.openAuthModal();
    };

    return (
        <header className={styles.header}>
            <Group
                width="1160px"
                direction="row"
                alignItems="center"
                className={styles.header__wrapper}
            >
                <Group direction="row" alignItems="center" gap={20}>
                    <Logo className={styles.header__logo} />
                    <Group direction="row" alignItems="center" gap={20}>
                        <Input placeholder="Поиск" />
                        <Group direction="row" gap={20} alignItems="center">
                            <Typography type="text-2">Мужское</Typography>
                            <Typography type="text-2">Женское</Typography>
                        </Group>
                    </Group>
                </Group>
                <Group direction="row" alignItems="center" gap={20}>
                    <Button>Продать</Button>
                    <button
                        className={styles.header__btn}
                        onClick={handleSignInButton}
                    >
                        <Typography type="text-2">Войти</Typography>
                    </button>
                </Group>
            </Group>
        </header>
    );
};
