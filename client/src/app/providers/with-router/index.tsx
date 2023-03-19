import React from "react";

import { createHistoryRouter } from "atomic-router";
import { RouterProvider } from "atomic-router-react";
import { createBrowserHistory } from "history";

import { routes } from "@pages";

const router = createHistoryRouter({ routes });

const history = createBrowserHistory();

router.setHistory(history);

export const withRouter = (component: () => React.ReactNode) => () =>
    <RouterProvider router={router}>{component()}</RouterProvider>;
