import React from "react";

import { Route } from "atomic-router-react";

import { ROUTES_MAP } from "@shared/lib";

import { HomePage } from "./home";
import { NewProductPage } from "./new-product";
import { ProfilePage } from "./profile";

export const Pages = () => {
    return (
        <>
            <Route route={ROUTES_MAP.profile} view={ProfilePage} />
            <Route route={ROUTES_MAP.home} view={HomePage} />
            <Route route={ROUTES_MAP.newProduct} view={NewProductPage} />
        </>
    );
};

export const routes = [
    {
        path: "/",
        route: ROUTES_MAP.home,
    },
    {
        path: "/profile",
        route: ROUTES_MAP.profile,
    },
    {
        path: "/new-product",
        route: ROUTES_MAP.newProduct,
    },
];
