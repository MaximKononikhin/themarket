import {
    chainRoute,
    redirect,
    RouteInstance,
    RouteParams,
    RouteParamsAndQuery,
} from "atomic-router";
import { createEvent, sample } from "effector";
import { and, combineEvents, not } from "patronum";

import { authModalModel } from "@features/auth-modal";
import { userModel } from "@entities/user";
import { ROUTES_MAP } from "@shared/lib";

export function createProtectedRoute<Params extends RouteParams>(
    route: RouteInstance<Params>
) {
    const $isAuthorized = userModel.$user.map(Boolean);

    const sessionCheckStarted = createEvent<RouteParamsAndQuery<Params>>();

    const alreadyAuthorized = sample({
        clock: sessionCheckStarted,
        filter: $isAuthorized,
    });

    const redirectEvent = redirect({
        route: ROUTES_MAP.home,
    });

    sample({
        clock: userModel.events.logout,
        target: [redirectEvent, authModalModel.events.openAuthModal],
    });

    sample({
        source: and(not($isAuthorized), not(userModel.$userLoading)),
        clock: combineEvents({
            events: [sessionCheckStarted, userModel.effects.getUserFx.failData],
        }),
        target: [redirectEvent, authModalModel.events.openAuthModal],
    });

    return chainRoute({
        route,
        beforeOpen: sessionCheckStarted,
        openOn: [alreadyAuthorized, userModel.effects.getUserFx.doneData],
    });
}
