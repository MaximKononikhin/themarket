import { allSettled, fork } from "effector";

import { $authModalStage, $isAuthModalOpened, events } from "../";

describe("features/authModalModel", () => {
    it("should open modal", async () => {
        const scope = fork({
            values: new Map().set($isAuthModalOpened, false),
        });

        await allSettled(events.openAuthModal, { scope });

        expect(scope.getState($isAuthModalOpened)).toBeTruthy();
    });

    it("should close modal and switch stage", async () => {
        const scope = fork({
            values: new Map()
                .set($isAuthModalOpened, true)
                .set($authModalStage, "register"),
        });

        await allSettled(events.closeAuthModal, { scope });

        expect(scope.getState($isAuthModalOpened)).toBeFalsy();
        expect(scope.getState($authModalStage)).toEqual("login");
    });
    
    it("should switch stage", async () => {
        const scope = fork({
            values: new Map()
                .set($authModalStage, "register"),
        });
        
        await allSettled(events.setLoginStage, { scope });
        
        expect(scope.getState($authModalStage)).toEqual("login");
    });
});
