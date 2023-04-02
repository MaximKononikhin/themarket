/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ConditionEntity } from "./ConditionEntity";
import type { ProductPhotoEntity } from "./ProductPhotoEntity";
import type { SizeEntity } from "./SizeEntity";
import type { UserEntity } from "./UserEntity";

export type ProductEntity = {
    id: number;
    created_at: string;
    brand: string;
    model: string;
    price: number;
    description: string;
    city: string;
    photos: Array<ProductPhotoEntity>;
    user: UserEntity;
    size: SizeEntity;
    condition: ConditionEntity;
};
