import { allSettled, fork } from "effector";

import { SubcategoryEntity } from "@shared/api";

import { $subcategories, effects, events } from "../";

const SUBCATEGORIES_MOCK: SubcategoryEntity[] = [
    { id: 1, name: "Shoes", translation: "shoes" },
];

describe("entities/subcategoriesModel", () => {
    it("fetch subcategories", async () => {
        const fakeGetSubcategoriesFx = jest.fn(() => SUBCATEGORIES_MOCK);

        const scope = fork({
            handlers: new Map().set(
                effects.getSubcategoriesFx,
                fakeGetSubcategoriesFx
            ),
        });

        expect(scope.getState($subcategories).length).toEqual(0);

        await allSettled(events.getSubcategories, { scope, params: 1 });

        expect(scope.getState($subcategories).length).toEqual(
            SUBCATEGORIES_MOCK.length
        );
    });
});
