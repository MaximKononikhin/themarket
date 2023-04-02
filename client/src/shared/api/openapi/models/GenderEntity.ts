/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type GenderEntity = {
    id: number;
    name: GenderEntity.name;
    translation: GenderEntity.translation;
};

export namespace GenderEntity {
    export enum name {
        MAN = "Мужской",
        WOMAN = "Женский",
    }

    export enum translation {
        MAN = "man",
        WOMAN = "woman",
    }
}
