import React from "react";

import { Route } from "atomic-router-react";

import { ROUTES_MAP } from "@shared/lib";

import { HomePage } from "./home";
import { ProfilePage } from "./profile";

export const Pages = () => {
    return (
        <>
            <Route route={ROUTES_MAP.profile} view={ProfilePage} />
            <Route route={ROUTES_MAP.home} view={HomePage} />
        </>
    );
};

export const routes = [
    {
        path: "/profile",
        route: ROUTES_MAP.profile,
    },
    {
        path: "/",
        route: ROUTES_MAP.home,
    },
];
