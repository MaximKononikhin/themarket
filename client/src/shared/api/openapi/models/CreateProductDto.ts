/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Photo } from "./Photo";

export type CreateProductDto = {
    brand: string;
    model: string;
    price: number;
    description: string;
    city: string;
    photos: Array<Photo>;
    genderId: number;
    categoryId: number;
    subcategoryId: number;
    sizeId: number;
    conditionId: number;
};
