import { createEffect, createEvent, createStore, sample } from "effector";
import { useStore } from "effector-react";

import { userModel } from "@entities/user";
import { ApiError, AuthService, CreateUserDto } from "@shared/api";
import { Maybe } from "@shared/types";

export const $error = createStore<Maybe<ApiError>>(null);

const registerUserFx = createEffect<CreateUserDto, void, ApiError>(
    async (dto) => await AuthService.authControllerSignUp(dto)
);

const registerUser = createEvent<CreateUserDto>();

export const $registerUserLoading = registerUserFx.pending;

sample({
    clock: registerUser,
    target: registerUserFx,
});

sample({
    clock: registerUserFx.doneData,
    target: userModel.events.getUser,
});

$error.on(registerUserFx.doneData, () => null);
$error.on(registerUserFx.failData, (_, err) => err);

const useRegisterUserError = () => useStore($error);
const useRegisterUserLoading = () => useStore($registerUserLoading);

export const events = { registerUser };
export const selectors = { useRegisterUserError, useRegisterUserLoading };
export const effects = { registerUserFx };
