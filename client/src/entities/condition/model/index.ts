import { createEffect, createEvent, createStore, sample } from "effector";
import { useStore } from "effector-react";

import { ApiError, ConditionEntity, DictionaryService } from "@shared/api";

export const $conditions = createStore<ConditionEntity[]>([]);

const getConditions = createEvent<number>();

const getConditionsFx = createEffect<number, ConditionEntity[], ApiError>(
    async (id) => await DictionaryService.dictionaryControllerGetConditions(id)
);

sample({
    clock: getConditions,
    target: getConditionsFx,
});

$conditions.on(getConditionsFx.doneData, (_, payload) => payload);

export const events = { getConditions };

export const effects = {
    getConditionsFx,
};

export const selectors = {
    useConditions: () => useStore($conditions),
};
