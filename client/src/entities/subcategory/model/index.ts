import { createEffect, createEvent, createStore, sample } from "effector";
import { useStore } from "effector-react";

import { ApiError, DictionaryService, SubcategoryEntity } from "@shared/api";

export const $subcategories = createStore<SubcategoryEntity[]>([]);

const getSubcategories = createEvent<number>();

const getSubcategoriesFx = createEffect<number, SubcategoryEntity[], ApiError>(
    async (id) =>
        await DictionaryService.dictionaryControllerGetSubcategories(id)
);

sample({
    clock: getSubcategories,
    target: getSubcategoriesFx,
});

$subcategories.on(getSubcategoriesFx.doneData, (_, payload) => payload);

export const events = { getSubcategories };

export const effects = {
    getSubcategoriesFx,
};

export const selectors = {
    useSubcategories: () => useStore($subcategories),
};
