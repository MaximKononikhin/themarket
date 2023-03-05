import { createEffect, createEvent, createStore, sample } from "effector";
import { useStore } from "effector-react";

import { ApiError, AuthService, UserEntity } from "@shared/api";
import { Maybe } from "@shared/types";

export const $user = createStore<Maybe<UserEntity>>(null);
export const $error = createStore<Maybe<ApiError>>(null);

const getUser = createEvent();
const logout = createEvent();

const getUserFx = createEffect<void, UserEntity, ApiError>(
    async () => await AuthService.authControllerAuthenticate()
);

const logoutFx = createEffect<void, void, ApiError>(
    async () => await AuthService.authControllerLogOut()
);

sample({
    clock: getUser,
    target: getUserFx,
});

sample({
    clock: logout,
    target: logoutFx,
});

export const $userLoading = getUserFx.pending;

$user.on(getUserFx.doneData, (_, user) => user);
$user.on(logoutFx.doneData, () => null);

$error.on([getUserFx.failData, logoutFx.failData], (_, error) => error);
$error.on(getUserFx.doneData, () => null);

const useUser = () => useStore($user);
const useUserError = () => useStore($error);
const useUserLoading = () => useStore($userLoading);

export const events = { getUser, logout };
export const selectors = { useUser, useUserError, useUserLoading };
export const effects = { getUserFx, logoutFx };
