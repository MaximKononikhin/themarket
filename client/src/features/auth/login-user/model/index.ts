import { createEffect, createEvent, createStore, sample } from "effector";
import { useStore } from "effector-react";

import { userModel } from "@entities/user";
import { ApiError, AuthService, LoginUserDto } from "@shared/api";
import { Maybe } from "@shared/types";

const loginUserFx = createEffect<LoginUserDto, void, ApiError>(
    async (data) => await AuthService.authControllerSignIn(data)
);

const loginUser = createEvent<LoginUserDto>();

export const $error = createStore<Maybe<ApiError>>(null);
const $loginUserLoading = loginUserFx.pending;

sample({
    clock: loginUser,
    target: loginUserFx,
});

sample({
    clock: loginUserFx.doneData,
    target: userModel.events.getUser,
});

$error.on(loginUserFx.doneData, () => null);
$error.on(loginUserFx.failData, (_, err) => err);

const useLoginUserError = () => useStore($error);
const useLoginUserLoading = () => useStore($loginUserLoading);

export const events = { loginUser };
export const selectors = { useLoginUserError, useLoginUserLoading };
export const effects = { loginUserFx };
