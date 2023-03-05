import { allSettled, fork } from "effector";

import { userModel } from "@entities/user";
import { apiErrorMock } from "@shared/lib/constants";

import { $error, effects, events } from "../.";

describe("features/loginUser", () => {
    it("should login", async () => {
        const loginUserFx = jest.fn();
        const getUserFakeFx = jest.fn();

        const scope = fork({
            handlers: new Map()
                .set(effects.loginUserFx, loginUserFx)
                .set(userModel.effects.getUserFx, getUserFakeFx),
        });

        await allSettled(events.loginUser, {
            scope,
            params: { email: "", password: "" },
        });

        expect(getUserFakeFx).toHaveBeenCalled();
    });

    it("should throw error", async () => {
        const loginUserFakeFx = jest.fn(() => {
            throw apiErrorMock;
        });

        const scope = fork({
            handlers: new Map().set(effects.loginUserFx, loginUserFakeFx),
        });

        expect(scope.getState($error)).toBeNull();

        await allSettled(events.loginUser, {
            scope,
            params: { email: "", password: "" },
        });

        expect(scope.getState($error)).toStrictEqual(apiErrorMock);
    });
});
