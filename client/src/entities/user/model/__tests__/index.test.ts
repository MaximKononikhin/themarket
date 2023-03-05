import { allSettled, fork } from "effector";

import { UserEntity } from "@shared/api";
import { apiErrorMock } from "@shared/lib/constants";

import { $error, $user, effects, events } from "../.";

const userMock: UserEntity = {
    id: 0,
    name: "Maxim",
    email: "test@gmail.com",
    avatar: null,
};

describe("entities/userModel", () => {
    it("user and userError should be null", () => {
        expect($user.getState()).toBeNull();
        expect($error.getState()).toBeNull();
    });

    it("should fetch user", async () => {
        const fakeGetUserFx = jest.fn(() => userMock);

        const scope = fork({
            handlers: new Map().set(effects.getUserFx, fakeGetUserFx),
        });

        expect(scope.getState($user)).toBeNull();

        await allSettled(events.getUser, { scope });

        expect(scope.getState($user)).toStrictEqual(userMock);
    });

    it("should throw error", async () => {
        const fakeGetUserFx = jest.fn(() => {
            throw apiErrorMock;
        });

        const scope = fork({
            handlers: new Map().set(effects.getUserFx, fakeGetUserFx),
        });

        expect(scope.getState($error)).toBeNull();

        await allSettled(events.getUser, { scope });

        expect(scope.getState($user)).toBeNull();
        expect(scope.getState($error)).not.toBeNull();
    });
});
