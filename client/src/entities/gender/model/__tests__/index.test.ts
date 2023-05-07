import { allSettled, fork } from "effector";

import { GenderEntity } from "@shared/api";

import { $genders, effects, events } from "../.";

const GENDER_MOCK: GenderEntity[] = [
    {
        id: 1,
        name: GenderEntity.name.MAN,
        translation: GenderEntity.translation.MAN,
    },
    {
        id: 2,
        name: GenderEntity.name.WOMAN,
        translation: GenderEntity.translation.WOMAN,
    },
];

describe("entities/genderModel", () => {
    it("should fetch genders", async () => {
        const fakeGetGendersFx = jest.fn(() => GENDER_MOCK);

        const scope = fork({
            handlers: new Map().set(effects.getGendersFx, fakeGetGendersFx),
        });

        expect(scope.getState($genders).length).toEqual(0);

        await allSettled(events.getGenders, { scope });

        expect(scope.getState($genders).length).toEqual(GENDER_MOCK.length);
    });
});
