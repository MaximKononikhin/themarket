import { allSettled, fork } from "effector";

import { ConditionEntity } from "@shared/api";

import { $conditions, effects, events } from "../index";

const CONDITIONS_MOCK: ConditionEntity[] = [{ id: 1, name: "test" }];

describe("entities/conditionsModel", () => {
    it("fetch conditions", async () => {
        const fakeGetConditionsFx = jest.fn(() => CONDITIONS_MOCK);

        const scope = fork({
            handlers: new Map().set(
                effects.getConditionsFx,
                fakeGetConditionsFx
            ),
        });

        expect(scope.getState($conditions).length).toEqual(0);

        await allSettled(events.getConditions, { scope, params: 1 });

        expect(scope.getState($conditions).length).toEqual(
            CONDITIONS_MOCK.length
        );
    });
});
