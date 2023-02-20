/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserEntity } from "../models/UserEntity";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class UserService {
    /**
     * Обновление информации пользователя
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static userControllerUpdateOne(
        requestBody: UserEntity
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: "PUT",
            url: "/api/user",
            body: requestBody,
            mediaType: "application/json",
        });
    }

    /**
     * Загрузка автара пользователя
     * @param avatar
     * @returns void
     * @throws ApiError
     */
    public static userControllerUploadAvatar(
        avatar?: Blob
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/api/user/avatar",
            formData: {
                avatar: avatar,
            },
            errors: {
                500: `Произошла ошибка при записи файл`,
            },
        });
    }

    /**
     * Удаление автара пользователя
     * @returns void
     * @throws ApiError
     */
    public static userControllerDeleteAvatar(): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: "DELETE",
            url: "/api/user/avatar",
            errors: {
                400: `У пользователя нет аватара`,
                500: `Произошла ошибка при удалении файл`,
            },
        });
    }
}
