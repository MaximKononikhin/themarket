import { allSettled, fork } from "effector";

import { SizeEntity } from "@shared/api";

import { $sizes, effects, events } from "../";

const SIZES_MOCK: SizeEntity[] = [{ id: 1, name: "S" }];

describe("entities/sizesModel", () => {
    it("fetch sizes", async () => {
        const fakeGetSizesFx = jest.fn(() => SIZES_MOCK);

        const scope = fork({
            handlers: new Map().set(effects.getSizesFx, fakeGetSizesFx),
        });

        expect(scope.getState($sizes).length).toEqual(0);

        await allSettled(events.getSizes, { scope, params: 1 });

        expect(scope.getState($sizes).length).toEqual(SIZES_MOCK.length);
    });
});
