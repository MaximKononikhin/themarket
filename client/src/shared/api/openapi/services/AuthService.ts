/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateUserDto } from "../models/CreateUserDto";
import type { LoginUserDto } from "../models/LoginUserDto";
import type { UserEntity } from "../models/UserEntity";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class AuthService {
    /**
     * Регистрация пользователя
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static authControllerSignUp(
        requestBody: CreateUserDto
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/api/auth/signup",
            body: requestBody,
            mediaType: "application/json",
            errors: {
                400: `Пользователь с таким email уже существует`,
            },
        });
    }

    /**
     * Авторизация пользователя
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static authControllerSignIn(
        requestBody: LoginUserDto
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/api/auth/signin",
            body: requestBody,
            mediaType: "application/json",
            errors: {
                400: `Неверный email или пароль`,
            },
        });
    }

    /**
     * Получения пользователя
     * @returns UserEntity
     * @throws ApiError
     */
    public static authControllerAuthenticate(): CancelablePromise<UserEntity> {
        return __request(OpenAPI, {
            method: "GET",
            url: "/api/auth",
        });
    }

    /**
     * Выход пользователя
     * @returns void
     * @throws ApiError
     */
    public static authControllerLogOut(): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/api/auth/logout",
        });
    }
}
