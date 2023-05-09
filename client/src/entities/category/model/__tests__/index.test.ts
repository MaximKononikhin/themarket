import { allSettled, fork } from "effector";

import { CategoryEntity } from "@shared/api";

import { $categories, effects, events } from "../index";

const CATEGORIES_MOCK: CategoryEntity[] = [
    { id: 1, name: "Shoes", translation: "shoes" },
];

describe("entities/categoriesModel", () => {
    it("fetch categories", async () => {
        const fakeGetCategoriesFx = jest.fn(() => CATEGORIES_MOCK);

        const scope = fork({
            handlers: new Map().set(
                effects.getCategoriesFx,
                fakeGetCategoriesFx
            ),
        });

        expect(scope.getState($categories).length).toEqual(0);

        await allSettled(events.getCategories, { scope, params: 1 });

        expect(scope.getState($categories).length).toEqual(
            CATEGORIES_MOCK.length
        );
    });
});
