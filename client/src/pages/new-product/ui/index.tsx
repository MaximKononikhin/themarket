import React from "react";

import { createRouteView } from "atomic-router-react";

import { createProtectedRoute } from "@features/auth-modal";
import { Layout, Typography } from "@shared/components";
import { ROUTES_MAP } from "@shared/lib";

export const NewProductPage = createRouteView({
    route: createProtectedRoute(ROUTES_MAP.newProduct),
    view() {
        return (
            <Layout>
                <Typography type="header-1">new product</Typography>
            </Layout>
        );
    },
});
