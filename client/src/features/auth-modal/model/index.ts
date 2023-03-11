import { createEvent, createStore, sample } from "effector";
import { useStore } from "effector-react";

import { userModel } from "@entities/user";

export const $isAuthModalOpened = createStore(false);
export const $authModalStage = createStore<"login" | "register">("login");

const openAuthModal = createEvent();
const closeAuthModal = createEvent();
const setRegisterStage = createEvent();
const setLoginStage = createEvent();

$isAuthModalOpened.on(openAuthModal, () => true);
$isAuthModalOpened.on(closeAuthModal, () => false);

$authModalStage.on(setLoginStage, () => "login");
$authModalStage.on(setRegisterStage, () => "register");

sample({
    clock: closeAuthModal,
    target: setLoginStage,
});

sample({
    clock: [
        userModel.effects.registerUserFx.doneData,
        userModel.effects.loginUserFx.doneData,
    ],
    target: closeAuthModal,
});

const useAuthModalOpened = () => useStore($isAuthModalOpened);
const useAuthModalStage = () => useStore($authModalStage);

export const events = {
    openAuthModal,
    closeAuthModal,
    setRegisterStage,
    setLoginStage,
};

export const selectors = { useAuthModalOpened, useAuthModalStage };
