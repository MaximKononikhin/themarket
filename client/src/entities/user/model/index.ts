import { createEffect, createEvent, createStore, sample } from "effector";
import { useStore } from "effector-react";

import {
    ApiError,
    AuthService,
    CreateUserDto,
    LoginUserDto,
    UserEntity,
} from "@shared/api";
import { Maybe } from "@shared/types";

const getUserFx = createEffect<void, UserEntity, ApiError>(
    async () => await AuthService.authControllerAuthenticate()
);
const loginUserFx = createEffect<LoginUserDto, void, ApiError>(
    async (data) => await AuthService.authControllerSignIn(data)
);
const logoutFx = createEffect<void, void, ApiError>(
    async () => await AuthService.authControllerLogOut()
);
const registerUserFx = createEffect<CreateUserDto, void, ApiError>(
    async (dto) => await AuthService.authControllerSignUp(dto)
);

export const $user = createStore<Maybe<UserEntity>>(null);

export const $loginUserLoading = loginUserFx.pending;
export const $userLoading = getUserFx.pending;
export const $registerUserLoading = registerUserFx.pending;

export const $userError = createStore<Maybe<ApiError>>(null);
export const $loginError = createStore<Maybe<ApiError>>(null);
export const $registerError = createStore<Maybe<ApiError>>(null);

const getUser = createEvent();
const logout = createEvent();
const loginUser = createEvent<LoginUserDto>();
const registerUser = createEvent<CreateUserDto>();

sample({
    clock: getUser,
    target: getUserFx,
});

sample({
    clock: logout,
    target: logoutFx,
});

sample({
    clock: loginUser,
    target: loginUserFx,
});

sample({
    clock: loginUserFx.doneData,
    target: getUser,
});

sample({
    clock: registerUser,
    target: registerUserFx,
});

sample({
    clock: registerUserFx.doneData,
    target: getUser,
});

$user.on(getUserFx.doneData, (_, user) => user);
$user.on(logoutFx.doneData, () => null);

$userError.on([getUserFx.failData, logoutFx.failData], (_, error) => error);
$userError.on(getUserFx.doneData, () => null);

$loginError.on(loginUserFx.doneData, () => null);
$loginError.on(loginUserFx.failData, (_, err) => err);

$registerError.on(registerUserFx.doneData, () => null);
$registerError.on(registerUserFx.failData, (_, err) => err);

const useUser = () => useStore($user);
const useUserError = () => useStore($userError);
const useUserLoading = () => useStore($userLoading);

const useLoginUserError = () => useStore($loginError);
const useLoginUserLoading = () => useStore($loginUserLoading);

const useRegisterUserError = () => useStore($registerError);
const useRegisterUserLoading = () => useStore($registerUserLoading);

export const events = { getUser, logout, loginUser, registerUser };
export const selectors = {
    useUser,
    useUserError,
    useUserLoading,
    useLoginUserError,
    useLoginUserLoading,
    useRegisterUserError,
    useRegisterUserLoading,
};
export const effects = { getUserFx, logoutFx, loginUserFx, registerUserFx };
