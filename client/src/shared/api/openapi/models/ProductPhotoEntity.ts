/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ProductEntity } from "./ProductEntity";

export type ProductPhotoEntity = {
    id: number;
    url: string;
    isMain: boolean;
    product: ProductEntity;
};
