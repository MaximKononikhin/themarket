import React from "react";

import { createRouteView } from "atomic-router-react";

import { createProtectedRoute } from "@features/auth-modal/lib";
import { Typography } from "@shared/components";
import { ROUTES_MAP } from "@shared/lib";

export const ProfilePage = createRouteView({
    route: createProtectedRoute(ROUTES_MAP.profile),
    view() {
        return <Typography type="header-1">PROFILE</Typography>;
    },
});
