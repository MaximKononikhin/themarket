import { allSettled, fork } from "effector";

import { UserEntity } from "@shared/api";
import { apiErrorMock } from "@shared/lib";

import {
    $loginError,
    $registerError,
    $user,
    $userError,
    effects,
    events,
} from "../.";

const userMock: UserEntity = {
    id: 0,
    name: "Maxim",
    email: "test@gmail.com",
    avatar: null,
};

describe("entities/userModel", () => {
    it("user and userError should be null", () => {
        expect($user.getState()).toBeNull();
        expect($userError.getState()).toBeNull();
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

    it("should logout", async () => {
        const fakeLogoutFx = jest.fn();

        const scope = fork({
            handlers: new Map().set(effects.logoutFx, fakeLogoutFx),
            values: new Map().set($user, userMock),
        });

        expect(scope.getState($user)).toStrictEqual(userMock);

        await allSettled(events.logout, { scope });

        expect(scope.getState($user)).toBeNull();
    });

    it("should throw error", async () => {
        const fakeGetUserFx = jest.fn(() => {
            throw apiErrorMock;
        });

        const scope = fork({
            handlers: new Map().set(effects.getUserFx, fakeGetUserFx),
        });

        expect(scope.getState($userError)).toBeNull();

        await allSettled(events.getUser, { scope });

        expect(scope.getState($user)).toBeNull();
        expect(scope.getState($userError)).not.toBeNull();
    });

    it("should register", async () => {
        const registerUserFakeFx = jest.fn();
        const getUserFakeFx = jest.fn();

        const scope = fork({
            handlers: new Map()
                .set(effects.registerUserFx, registerUserFakeFx)
                .set(effects.getUserFx, getUserFakeFx),
        });

        await allSettled(events.registerUser, {
            scope,
            params: { email: "", password: "", name: "" },
        });

        expect(getUserFakeFx).toHaveBeenCalled();
    });

    it("should throw register error", async () => {
        const registerUserFakeFx = jest.fn(() => {
            throw apiErrorMock;
        });

        const scope = fork({
            handlers: new Map().set(effects.registerUserFx, registerUserFakeFx),
        });

        expect(scope.getState($registerError)).toBeNull();

        await allSettled(events.registerUser, {
            scope,
            params: { email: "", password: "", name: "" },
        });

        expect(scope.getState($registerError)).toStrictEqual(apiErrorMock);
    });

    it("should login", async () => {
        const loginUserFx = jest.fn();
        const getUserFakeFx = jest.fn();

        const scope = fork({
            handlers: new Map()
                .set(effects.loginUserFx, loginUserFx)
                .set(effects.getUserFx, getUserFakeFx),
        });

        await allSettled(events.loginUser, {
            scope,
            params: { email: "", password: "" },
        });

        expect(getUserFakeFx).toHaveBeenCalled();
    });

    it("should throw login error", async () => {
        const loginUserFakeFx = jest.fn(() => {
            throw apiErrorMock;
        });

        const scope = fork({
            handlers: new Map().set(effects.loginUserFx, loginUserFakeFx),
        });

        expect(scope.getState($loginError)).toBeNull();

        await allSettled(events.loginUser, {
            scope,
            params: { email: "", password: "" },
        });

        expect(scope.getState($loginError)).toStrictEqual(apiErrorMock);
    });
});
