import compose from "compose-function";

import { withRouter } from "@app/providers/with-router";

export const withProviders = compose(withRouter);
