import { createEffect, createEvent, createStore, sample } from "effector";
import { useStore } from "effector-react";

import { ApiError, AuthService, UserEntity } from "@shared/api";
import { Maybe } from "@shared/types";

export const $user = createStore<Maybe<UserEntity>>(null);
export const $error = createStore<Maybe<ApiError>>(null);

const getUser = createEvent();

const getUserFx = createEffect<void, UserEntity, ApiError>(
    async () => await AuthService.authControllerAuthenticate()
);

sample({
    clock: getUser,
    target: getUserFx,
});

export const $userLoading = getUserFx.pending;

$user.on(getUserFx.doneData, (_, user) => user);

$error.on(getUserFx.failData, (_, error) => error);
$error.on(getUserFx.doneData, () => null);

const useUser = () => useStore($user);
const useUserError = () => useStore($error);
const useUserLoading = () => useStore($userLoading);

export const events = { getUser };
export const selectors = { useUser, useUserError, useUserLoading };
export const effects = { getUserFx };
