import { createEffect, createEvent, createStore, sample } from "effector";
import { useStore } from "effector-react";

import { ApiError, CategoryEntity, DictionaryService } from "@shared/api";

export const $categories = createStore<CategoryEntity[]>([]);

const getCategories = createEvent<number>();

const getCategoriesFx = createEffect<number, CategoryEntity[], ApiError>(
    async (id) => await DictionaryService.dictionaryControllerGetCategories(id)
);

sample({
    clock: getCategories,
    target: getCategoriesFx,
});

$categories.on(getCategoriesFx.doneData, (_, payload) => payload);

export const events = { getCategories };

export const effects = {
    getCategoriesFx,
};

export const selectors = {
    useCategories: () => useStore($categories),
};
