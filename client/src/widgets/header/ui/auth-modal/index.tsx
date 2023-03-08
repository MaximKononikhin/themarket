import React from "react";

import { LoginUserForm } from "@features/auth/login-user";
import { RegisterUserForm } from "@features/auth/register-user";
import { Group, Typography } from "@shared/components";
import { Modal } from "@shared/components/modal";

import { events, selectors } from "../../model";
import styles from "./index.module.scss";

export const AuthModal = () => {
    const isOpened = selectors.useAuthModalOpened();
    const modalStage = selectors.useAuthModalStage();

    const loginContent = (
        <>
            <LoginUserForm />
            <Typography type="text-2">
                Ещё нет профиля?{" "}
                <span
                    onClick={() => events.setRegisterStage()}
                    className={styles.btn}
                >
                    Зарегистрируйтесь
                </span>
            </Typography>
        </>
    );

    const registerContent = (
        <>
            <RegisterUserForm />
            <Typography type="text-2">
                Уже есть профиль?
                <span
                    onClick={() => events.setLoginStage()}
                    className={styles.btn}
                >
                    Войдите
                </span>
            </Typography>
        </>
    );

    const content = modalStage === "login" ? loginContent : registerContent;

    return (
        <Modal isOpen={isOpened} onClose={events.closeAuthModal}>
            <Group gap={20} direction="column" width="100%">
                {content}
            </Group>
        </Modal>
    );
};
