/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CategoryEntity } from "../models/CategoryEntity";
import type { ConditionEntity } from "../models/ConditionEntity";
import type { GenderEntity } from "../models/GenderEntity";
import type { SizeEntity } from "../models/SizeEntity";
import type { SubcategoryEntity } from "../models/SubcategoryEntity";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class DictionaryService {
    /**
     * Получение полов
     * @returns GenderEntity
     * @throws ApiError
     */
    public static dictionaryControllerGetGenders(): CancelablePromise<
        Array<GenderEntity>
    > {
        return __request(OpenAPI, {
            method: "GET",
            url: "/api/dictionary/genders",
        });
    }

    /**
     * Получение категорий
     * @param genderId
     * @returns CategoryEntity
     * @throws ApiError
     */
    public static dictionaryControllerGetCategories(
        genderId: number
    ): CancelablePromise<Array<CategoryEntity>> {
        return __request(OpenAPI, {
            method: "GET",
            url: "/api/dictionary/categories/{genderId}",
            path: {
                genderId: genderId,
            },
        });
    }

    /**
     * Получение подкатегорий
     * @param categoryId
     * @returns SubcategoryEntity
     * @throws ApiError
     */
    public static dictionaryControllerGetSubcategories(
        categoryId: number
    ): CancelablePromise<Array<SubcategoryEntity>> {
        return __request(OpenAPI, {
            method: "GET",
            url: "/api/dictionary/subcategories/{categoryId}",
            path: {
                categoryId: categoryId,
            },
        });
    }

    /**
     * Получение состояниий вещи
     * @param genderId
     * @returns ConditionEntity
     * @throws ApiError
     */
    public static dictionaryControllerGetConditions(
        genderId: number
    ): CancelablePromise<Array<ConditionEntity>> {
        return __request(OpenAPI, {
            method: "GET",
            url: "/api/dictionary/conditions/{genderId}",
            path: {
                genderId: genderId,
            },
        });
    }

    /**
     * Получение размеров
     * @param categoryId
     * @returns SizeEntity
     * @throws ApiError
     */
    public static dictionaryControllerGetSizes(
        categoryId: number
    ): CancelablePromise<Array<SizeEntity>> {
        return __request(OpenAPI, {
            method: "GET",
            url: "/api/dictionary/sizes/{categoryId}",
            path: {
                categoryId: categoryId,
            },
        });
    }
}
