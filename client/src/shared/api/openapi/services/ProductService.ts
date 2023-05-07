/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateProductDto } from "../models/CreateProductDto";
import type { ProductEntity } from "../models/ProductEntity";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class ProductService {
    /**
     * Создание товара
     * @param requestBody
     * @returns ProductEntity
     * @throws ApiError
     */
    public static productControllerCreate(
        requestBody: CreateProductDto
    ): CancelablePromise<ProductEntity> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/api/product",
            body: requestBody,
            mediaType: "application/json",
        });
    }

    /**
     * Получение товаров
     * @returns ProductEntity
     * @throws ApiError
     */
    public static productControllerGetAll(): CancelablePromise<
        Array<ProductEntity>
    > {
        return __request(OpenAPI, {
            method: "GET",
            url: "/api/product",
        });
    }

    /**
     * Загрузка фотографий товара
     * @param photos
     * @returns any[]
     * @returns string
     * @throws ApiError
     */
    public static productControllerUploadFiles(
        photos?: Blob
    ): CancelablePromise<any[] | Array<string>> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/api/product/photos",
            formData: {
                photos: photos,
            },
        });
    }
}
