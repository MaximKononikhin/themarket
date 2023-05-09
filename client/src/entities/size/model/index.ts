import { createEffect, createEvent, createStore, sample } from "effector";
import { useStore } from "effector-react";

import { ApiError, DictionaryService, SizeEntity } from "@shared/api";

export const $sizes = createStore<SizeEntity[]>([]);

const getSizes = createEvent<number>();

const getSizesFx = createEffect<number, SizeEntity[], ApiError>(
    async (id) => await DictionaryService.dictionaryControllerGetSizes(id)
);

sample({
    clock: getSizes,
    target: getSizesFx,
});

$sizes.on(getSizesFx.doneData, (_, payload) => payload);

export const events = { getSizes };

export const effects = {
    getSizesFx,
};

export const selectors = {
    useSizes: () => useStore($sizes),
};
