import { allSettled, fork } from "effector";

import { userModel } from "@entities/user";
import { apiErrorMock } from "@shared/lib/constants";

import { $error, effects, events } from "../.";

describe("features/registerUser", () => {
    it("should register", async () => {
        const registerUserFakeFx = jest.fn();
        const getUserFakeFx = jest.fn();

        const scope = fork({
            handlers: new Map()
                .set(effects.registerUserFx, registerUserFakeFx)
                .set(userModel.effects.getUserFx, getUserFakeFx),
        });

        await allSettled(events.registerUser, {
            scope,
            params: { email: "", password: "", name: "" },
        });

        expect(getUserFakeFx).toHaveBeenCalled();
    });

    it("should throw error", async () => {
        const registerUserFakeFx = jest.fn(() => {
            throw apiErrorMock;
        });

        const scope = fork({
            handlers: new Map().set(effects.registerUserFx, registerUserFakeFx),
        });

        expect(scope.getState($error)).toBeNull();

        await allSettled(events.registerUser, {
            scope,
            params: { email: "", password: "", name: "" },
        });

        expect(scope.getState($error)).toStrictEqual(apiErrorMock);
    });
});
