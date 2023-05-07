import { createEffect, createEvent, createStore, sample } from "effector";
import { useStore } from "effector-react";

import { ApiError, DictionaryService, GenderEntity } from "@shared/api";

export const $genders = createStore<GenderEntity[]>([]);

const getGenders = createEvent();

const getGendersFx = createEffect<void, GenderEntity[], ApiError>(
    async () => await DictionaryService.dictionaryControllerGetGenders()
);

sample({
    clock: getGenders,
    target: getGendersFx,
});

$genders.on(getGendersFx.doneData, (_, payload) => payload);

export const events = { getGenders };

export const effects = { getGendersFx };

export const selectors = {
    useGenders: () => useStore($genders),
};
